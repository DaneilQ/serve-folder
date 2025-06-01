# Folder Serve Application

This project is a static file server built using Deno. It allows you to serve a directory of HTML files over HTTP, making it easy to preview or share static websites locally. The application automatically maps HTML files in the directory to routes and provides a simple way to navigate through them.

## Features

- **Serve Static Files**: Automatically serves HTML files from a specified directory.
- **Dynamic Routing**: Generates routes based on the directory structure and file names.
- **404 Handling**: Supports custom `404.html` files for handling unmatched routes.
- **Cross-Platform**: Opens the served folder in the default browser, with support for Windows, macOS, and Linux.
- **Customizable Port**: Allows specifying the port to serve the files.

## How It Works

1. **Directory Parsing**:
   - The `Directory` class scans the specified directory recursively.
   - It identifies all `.html` files and maps them to routes.
   - Special handling is provided for `index.html` (mapped to the root of the folder) and `404.html` (mapped to a catch-all route).

2. **Route Management**:
   - The `RouteFactory` class generates route paths and maps them to their corresponding HTML files.
   - The `Route` class manages the routes using the `@oak/oak` router.

3. **Serving Files**:
   - The `Serve` class initializes an HTTP server using the `@oak/oak` framework.
   - Routes are dynamically registered based on the directory structure.
   - If a route is not found, the server attempts to serve static files directly from the directory.

4. **Command Execution**:
   - The `CommandFactory` class opens the served folder in the default browser based on the operating system.

5. **CLI Arguments**:
   - The application accepts two optional arguments:
     - `--path`: The directory to serve (defaults to the current working directory).
     - `--port`: The port to serve the files on (defaults to `9999`).

## Installation

1. Install [Deno](https://deno.land/) if you haven't already.
2. Clone this repository:
   ```bash
   git clone <repository-url>
   cd serve-folder
3. Install dependencies:
  ```bash
  deno install
  ```

4. Compile the application for your target platform. This step creates a standalone executable binary that can run on your operating system. Use the following command, replacing `<your target platform>` with the desired platform (e.g., `windows-x64`, `linux-x64`, or `mac-arc`):
    ```bash
    deno task compile-<your target platform>
    ```

5. Once the binary is compiled, add it to your system's PATH environment variable. This allows you to run the `serve` command from any directory without needing to specify its full path. Refer to your operating system's documentation for instructions on how to add a binary to PATH.

## Usage from PATH

After adding the binary to PATH, you can serve any folder by navigating to it and running the `serve` command. For example:
  ```bash
      cd development-folder
      serve
  ```

## Usage as a standalone binary

If you prefer not to add the binary to PATH, you can still run it directly by specifying its full path. Use the `--path` argument to define the folder you want to serve and the `--port` argument to specify the port number. For example:
  ```bash
      ./path/to/bin/serve --path /path/to/target/folder --port 6969
  ```
