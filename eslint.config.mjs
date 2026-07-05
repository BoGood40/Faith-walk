import globals from "globals";

export default [
  {
    files: ["src/renderer.js", "api-polyfill.js", "sw.js", "serve-pwa.js"],
    languageOptions: { globals: { ...globals.browser, ...globals.serviceworker } },
    rules: {
      "no-unused-vars": ["warn", { "args": "none" }],
      "semi": "warn",
      "no-unreachable": "error",
      "no-constant-condition": "warn",
    },
  },
  {
    files: ["main.js", "preload.js", "src/json-store.js"],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      "no-unused-vars": ["warn", { "args": "none" }],
      "semi": "warn",
      "no-unreachable": "error",
    },
  },
  {
    ignores: ["node_modules/**", "android/**", "www/**", "scripts/**", ".gradle/**"],
  },
];
