import CommandFactory from "./command.ts";

export default class Directory {
  static async read(path: string, port: number) {
    console.clear();
    console.log("Files on folder:");
    for await (const file of Deno.readDir(path)) {
      if (file.name === "index.html") {
        new CommandFactory(Deno.build.os, port).execute();
      } else {
        console.log(`    - ${file.name}`);
      }
    }
    console.log(`Folder served at http://localhost:${port}`);
  }
}
