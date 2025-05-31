import { parseArgs } from "jsr:@std/cli/parse-args";
import Parse from "./parse.ts";
import Directory from "./directory.ts";
import Serve from "./serve.ts";

async function main(): Promise<null | boolean> {
  const { path, port } = parseArgs(Deno.args, { string: ["path", "port"] });
  const [parsed_path, parsed_port] = [Parse.path(path), Parse.port(port)];
  Serve.dir(parsed_path, parsed_port);
  await Directory.read(parsed_path, parsed_port);
  return true;
}

main();
