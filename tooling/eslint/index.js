const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@eslint/js/recommended",
    "@typescript-eslint/recommended-type-checked",
    "@typescript-eslint/stylistic-type-checked",
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
      typescript: {
        project,
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
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
  rules: {
    // 2025: TypeScript Enhanced Rules
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "error", // Stricter than warn
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "separate-type-imports" }
    ],
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ],

    // 2025: Type Safety Rules
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",

    // 2025: Modern JavaScript Features
    "prefer-const": "error",
    "no-var": "error",
    "prefer-template": "error",
    "prefer-destructuring": ["error", { "object": true, "array": true }],
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",

    // 2025: Import/Export Standards
    "import/no-default-export": "warn", // Prefer named exports
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

    // 2025: Performance & Bundle Size
    "no-dynamic-require": "error",
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

    // 2025: Healthcare-Specific Rules
    "no-console": ["warn", { "allow": ["error"] }], // Only allow console.error
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