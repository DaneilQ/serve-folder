export default class Parse {
  static port(str?: string | undefined): number {
    return str !== undefined ? Number(str) : 9999;
  }
  static path(srt?: string | undefined): string {
    if (srt === undefined) {
      return Deno.cwd();
    }
    return srt;
  }
}
