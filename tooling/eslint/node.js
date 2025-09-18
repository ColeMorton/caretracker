const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
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
    "**/*.d.ts", // Ignore TypeScript declaration files
  ],
  rules: {
    // Node.js specific overrides
    "@typescript-eslint/no-var-requires": "off",
    "import/no-default-export": "off", // Allow default exports in Node.js

    // 2025: TypeScript Enhanced Rules
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "separate-type-imports" }
    ],
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ],

    // 2025: Modern JavaScript Features
    "prefer-const": "error",
    "no-var": "error",
    "prefer-template": "error",
    "prefer-destructuring": ["error", { "object": true, "array": true }],
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",

    // 2025: Import/Export Standards
    "import/prefer-default-export": "off",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }
    ],

    // 2025: Performance & Bundle Size (disabled no-dynamic-require as it's Node.js specific)
    // "no-dynamic-require": "error", // Not available in this ESLint version
    "import/no-dynamic-require": "error",

    // 2025: Functional Programming Preferences
    "functional/no-let": "warn",
    "functional/prefer-readonly-type": "warn",
    "functional/no-return-void": ["error", { "allowNull": true, "allowUndefined": true }],

    // 2025: Security Rules
    "security/detect-object-injection": "error",
    "security/detect-non-literal-regexp": "error",
    "security/detect-possible-timing-attacks": "error",

    // 2025: Code Quality (SonarJS)
    "sonarjs/cognitive-complexity": ["error", 15],
    "sonarjs/no-duplicate-string": ["error", { "threshold": 3 }],
    "sonarjs/no-identical-functions": "error",

    // 2025: Node.js specific
    "no-console": ["warn", { "allow": ["error"] }],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^[A-Z]",
          "match": true
        }
      },
      {
        "selector": "typeAlias",
        "format": ["PascalCase"]
      },
      {
        "selector": "enum",
        "format": ["PascalCase"]
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE"]
      }
    ],
  },
};