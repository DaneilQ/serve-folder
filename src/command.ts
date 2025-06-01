export default class CommandFactory {
  public command: Deno.Command;
  constructor(os_name: string, port: number) {
    const url = `http://localhost:${port}/`;
    const args_arr = [url];
    let command_name = "";
    switch (os_name) {
      case "windows":
        command_name = "cmd";
        args_arr.push("/c", "start");
        break;
      case "darwin":
        command_name = "open";
        break;
      default:
        command_name = "xdg-open";
        break;
    }
    this.command = new Deno.Command(command_name, { args: args_arr });
  }
  execute() {
    this.command.spawn();
  }
}
