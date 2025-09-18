const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "next/core-web-vitals",
    "@caretracker/eslint-config",
    "eslint-config-prettier",
  ],
  parserOptions: {
    project,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-html-link-for-pages": "off",
  },
};