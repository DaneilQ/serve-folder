
import { Application } from "jsr:@oak/oak";
import { parseArgs } from "jsr:@std/cli/parse-args";
const parse_path = (str?: string | undefined) => str !== undefined ? Number(str) : 9999;
async function read_dir(path: string, port: number) {
  for await (const file of Deno.readDir(path)) {
    if (file.name === "index.html") {
      const command = Deno.build.os === "windows"
        ? new Deno.Command("cmd", { args: ["/c", "start", `http://localhost:${port}/index.html`] })
        : Deno.build.os === "darwin"
          ? new Deno.Command("open", { args: [`http://localhost:${port}/index.html`] })
          : new Deno.Command("xdg-open", { args: [`http://localhost:${port}/index.html`] });
      await command.spawn();
    }
  }
}
function serve_dir(path: string, port: number) {
  const app = new Application();
  app.use(async (context, next) => {
    try {
      await context.send({ root: path })
    } catch {
      next();
    }
  })
  app.listen({ port });
};
async function init_server(): Promise<null | boolean> {
  const { path, port } = parseArgs(Deno.args, {
    string: ["path", "port"],
  });
  if (!path) return null;
  const parsed_port = parse_path(port);
  serve_dir(path, parsed_port);
  await read_dir(path, parsed_port);
  console.clear();
  console.log(`Folder served at http://localhost:${parsed_port}`)
  return true;
};
init_server();