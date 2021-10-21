const root = process.cwd();
export default {
  exclude: [
    `${root}/node_modules/**/*`,
    `${root}/*.md`,
    `${root}/.vscode/**/*`,
    `${root}/lib/**/*`,
    `${root}/.gitignore`,
    `${root}/.nvmrc`
  ],
  mount: {},
  plugins: ["@snowpack/plugin-svelte"],
  routes: [],
  optimize: {},
  packageOptions: {},
  devOptions: {},
  buildOptions: {
    out: "docs",
    baseUrl: "/offset-polygon",
    metaUrlPath: "snowpack"
  }
};
