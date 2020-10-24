# inert-cli
CLI for the Inert static site generator

The Inert static site generator is my new side project. It is primarily designed for blogging.

To use this tool, you must first install it **globally** from npm.
```bash
npm install inert-cli -g
```

Then, create a new folder for your project, navigate to it, and run
```bash
inert init
```

To build your project, run
```bash
inert build
```

to watch files and rebuild automatically on changes, run
```bash
inert build --watch
```

To serve a demo version of your project, run
```bash
inert serve
```