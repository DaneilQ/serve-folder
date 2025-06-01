import { Router } from "@oak/oak";
import Serve from "./serve.ts";
import CommandFactory from "./command.ts";

export class RouteFactory {
  static regex = new RegExp(/\/+/g);
  route: string;
  route_name: string;
  full_name: string;
  constructor(route: string, path: string, inner_path: string, port: number) {
    this.route = route;
    this.full_name = `${path}${inner_path}${
      this.route.replace(
        RouteFactory.regex,
        "",
      )
    }.html`;
    if (this.route === "(.*)") {
      this.route = "404";
    } else if (this.route === "index") {
      this.route = "";
    }
    let altered__inner_path = inner_path;
    if (this.route === "") {
      const splitted = inner_path.split("/");
      altered__inner_path = splitted.slice(0, splitted.length - 1).join(
        "/",
      );
    }
    this.route_name = `${altered__inner_path}${this.route}`;
    if (this.route_name === "") {
      new CommandFactory(Deno.build.os, port).execute();
    }
  }
}

export class Route {
  private router: Router;
  constructor() {
    this.router = new Router();
  }
  append_to(route_name: string, file_name: string) {
    this.router.get(
      route_name,
      async (ctx) => await Serve.html(ctx, file_name),
    );
  }
  get() {
    return this.router;
  }
}
