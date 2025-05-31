import { Application } from "@oak/oak";

export default class Serve {
  static dir(path: string, port: number) {
    const app = new Application();
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
