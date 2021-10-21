const root = process.cwd();

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  exclude: [
    `${root}/node_modules/**/*`,
    `${root}/*.md`,
    `${root}/.vscode/**/*`,
    `${root}/lib/**/*`,
    `${root}/.gitignore`,
    `${root}/.nvmrc`,
  ],
  mount: {
    /* ... */
  },
  plugins: ['@snowpack/plugin-svelte'],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: 'docs',
    baseUrl: '/offset-polygon',
  },
};
