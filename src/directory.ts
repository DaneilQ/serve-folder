export default class Directory {
  endpoints: { [key: string]: Array<string> } = {};
  regex = new RegExp(/.html/);
  async read(path: string) {
    console.clear();
    console.log("Files on folder:");
    await this.get_endpoints(path, "/");
    // if (index_file) new CommandFactory(Deno.build.os, port).execute();
    // console.log(`Folder served at http://localhost:${port}`);
  }
  async get_endpoints(path_name: string, folder_name: string): Promise<void> {
    const endpoint_arr: Array<string> = [];
    for await (const file of Deno.readDir(path_name)) {
      if (file.isDirectory) {
        await this.get_endpoints(
          `${path_name}/${file.name}`,
          `${folder_name}${file.name}/`,
        );
      } else if (file.name.match(this.regex)) {
        let endpoint = file.name.split(this.regex)[0];
        if (endpoint === "404") {
          endpoint = "(.*)";
        }
        endpoint_arr.push(endpoint);
      }
    }
    endpoint_arr.sort((b, a) => a.localeCompare(b));
    if (endpoint_arr.length > 0) this.endpoints[folder_name] = endpoint_arr;
  }
}
