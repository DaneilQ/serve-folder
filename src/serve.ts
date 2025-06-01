import { Application, Context } from "@oak/oak";
import { Route, RouteFactory } from "./route.ts";

export default class Serve {
  static regex = new RegExp(/\/+/g);
  static dir(
    path: string,
    endpoints: { [key: string]: Array<string> },
    port: number,
  ) {
    const app = new Application();
    const r = new Route();
    const entries = Object.entries(endpoints);
    let i = 0;
    while (i < entries.length) {
      const [inner_path, routes] = entries[i];
      let j = 0;
      while (j < routes.length) {
        const route = routes[j];
        const route_data = new RouteFactory(route, path, inner_path, port);
        r.append_to(route_data.route_name, route_data.full_name);
        j++;
      }
      i++;
    }
    app.use(r.get().routes());
    app.use(async (context, next) => {
      try {
        await context.send({ root: path });
      } catch {
        next();
      }
    });
    app.listen({ port });
  }

  static async html(ctx: Context, full_name: string) {
    try {
      const decoder = new TextDecoder("utf-8");
      const file = await Deno.readFile(full_name);
      const text = decoder.decode(file);
      ctx.response.body = text;
      ctx.response.type = "text/html";
      ctx.response.status = 200;
    } catch (err) {
      console.log("error loading file");
      console.log(err);
    }
  }
}
