const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint-config-prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "import",
    "functional",
    "security",
    "sonarjs"
  ],
  parserOptions: {
    project,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es2023: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    },
  },
  ignorePatterns: [
    ".*.js",
    "node_modules/",
    "dist/",
    "build/",
    ".next/",
    "coverage/",
    "**/*.d.ts",
  ],
  rules: {
    // Next.js specific overrides
    "react/no-unescaped-entities": "off",
    "@next/next/no-html-link-for-pages": "off",

    // TypeScript rules (relaxed for Next.js)
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "separate-type-imports" }
    ],

    // Modern JavaScript
    "prefer-const": "error",
    "no-var": "error",
    "prefer-template": "error",
    "object-shorthand": "error",

    // Import/Export (allow default exports for Next.js)
    "import/no-default-export": "off",
    "import/prefer-default-export": "off",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }
    ],

    // Functional Programming (relaxed for React)
    "functional/no-let": "off",
    "functional/prefer-readonly-type": "warn",
    "functional/no-return-void": "off",

    // Security
    "security/detect-object-injection": "error",
    "security/detect-non-literal-regexp": "error",
    "security/detect-possible-timing-attacks": "error",

    // Code Quality (relaxed for React)
    "sonarjs/cognitive-complexity": ["warn", 20],
    "sonarjs/no-duplicate-string": ["warn", { "threshold": 5 }],

    // Console usage
    "no-console": ["warn", { "allow": ["error", "warn"] }],
  },
};