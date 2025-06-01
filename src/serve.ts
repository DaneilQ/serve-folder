import { Application, Router } from "@oak/oak";

export default class Serve {
  static dir(
    path: string,
    endpoints: { [key: string]: Array<string> },
    port: number,
  ) {
    const app = new Application();
    const router = new Router();
    const entries = Object.entries(endpoints);
    const decoder = new TextDecoder("utf-8");
    for (let i = 0; i < entries.length; i++) {
      const [inner_path, routes] = entries[i];
      for (let route of routes) {
        const full_name = `${path}${inner_path}${
          route.replace(/\/+/g, "")
        }.html`;
        if (route === "(.*)") {
          route = "404";
        } else if (route === "index") {
          route = "";
        }
        let altered__inner_path = inner_path;
        if (route === "") {
          const splitted = inner_path.split("/");
          altered__inner_path = splitted.slice(0, splitted.length - 1).join(
            "/",
          );
        }
        router.get(`${altered__inner_path}${route}`, async (ctx) => {
          try {
            const file = await Deno.readFile(
              full_name,
            );
            const text = decoder.decode(file);
            ctx.response.body = text;
            ctx.response.type = "text/html";
            ctx.response.status = 200;
          } catch (err) {
            console.log("error loading file");
            console.log(err);
          }
        });
      }
    }
    app.use(router.routes());
    app.use(async (context, next) => {
      try {
        await context.send({ root: path });
      } catch {
        next();
      }
    });
    app.listen({ port });
  }
}
