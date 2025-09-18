const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: ["@caretracker/eslint-config", "eslint-config-prettier"],
  parserOptions: {
    project,
  },
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
  },
};