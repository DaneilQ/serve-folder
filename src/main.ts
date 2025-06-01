import { parseArgs } from "jsr:@std/cli/parse-args";
import Parse from "./parse.ts";
import Directory from "./directory.ts";
import Serve from "./serve.ts";

const PATH = "path";
const PORT = "port";

async function main(): Promise<null | boolean> {
  const { path, port } = parseArgs(Deno.args, { string: [PATH, PORT] });
  console.clear();
  const [parsed_path, parsed_port] = [Parse.path(path), Parse.port(port)];
  const directory = new Directory();
  await directory.read(parsed_path);
  Serve.dir(parsed_path, directory.endpoints, parsed_port);
  console.log(`Folder served at http://localhost:${parsed_port}`);
  return true;
}

main();
