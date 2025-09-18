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
    "**/*.d.ts", // Ignore TypeScript declaration files
  ],
  rules: {
    // Next.js specific overrides
    "react/no-unescaped-entities": "off",
    "@next/next/no-html-link-for-pages": "off",

    // 2025: TypeScript Enhanced Rules (relaxed for Next.js)
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn", // Warn instead of error for Next.js
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "separate-type-imports" }
    ],

    // 2025: Modern JavaScript Features
    "prefer-const": "error",
    "no-var": "error",
    "prefer-template": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",

    // 2025: Import/Export Standards (allow default exports for Next.js)
    "import/no-default-export": "off", // Next.js requires default exports
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

    // 2025: Functional Programming (relaxed for React)
    "functional/no-let": "off", // Allow let in React components
    "functional/prefer-readonly-type": "warn",
    "functional/no-return-void": "off", // React components return void

    // 2025: Security Rules
    "security/detect-object-injection": "error",
    "security/detect-non-literal-regexp": "error",
    "security/detect-possible-timing-attacks": "error",

    // 2025: Code Quality (SonarJS) - relaxed
    "sonarjs/cognitive-complexity": ["warn", 20], // Higher for React components
    "sonarjs/no-duplicate-string": ["warn", { "threshold": 5 }],

    // 2025: React/Next.js specific
    "no-console": ["warn", { "allow": ["error", "warn"] }], // Allow console.warn for development
  },
};