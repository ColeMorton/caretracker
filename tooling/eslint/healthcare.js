const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: ["@caretracker/eslint-config"],
  plugins: ["@tanstack/query"],
  rules: {
    // Healthcare Data Safety Rules
    "@typescript-eslint/no-explicit-any": "error", // Never allow any in healthcare
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",

    // Healthcare Audit Trail Requirements
    "no-console": ["error", { "allow": ["error", "warn"] }], // Only structured logging
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: false, // Always require return types for healthcare functions
        allowTypedFunctionExpressions: true
      }
    ],

    // PII/PHI Data Protection
    "security/detect-object-injection": "error",
    "security/detect-non-literal-regexp": "error",
    "security/detect-possible-timing-attacks": "error",

    // Healthcare-Specific Naming Conventions
    "@typescript-eslint/naming-convention": [
      "error",
      // Healthcare entities must be PascalCase
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "filter": {
          "regex": "(Visit|User|Patient|CarePlan|Budget)",
          "match": true
        }
      },
      // Healthcare enums must be PascalCase with UPPER_CASE members
      {
        "selector": "enum",
        "format": ["PascalCase"],
        "filter": {
          "regex": "(Role|VisitStatus|DataClassification)",
          "match": true
        }
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE"]
      },
      // Healthcare functions must be descriptive
      {
        "selector": "function",
        "format": ["camelCase"],
        "filter": {
          "regex": "(schedule|complete|cancel|audit|log)",
          "match": true
        },
        "leadingUnderscore": "forbid"
      }
    ],

    // React Query Healthcare Rules
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "error",
    "@tanstack/query/stable-query-client": "error",

    // Healthcare Data Validation
    "sonarjs/cognitive-complexity": ["error", 10], // Lower complexity for healthcare
    "sonarjs/no-duplicate-string": ["error", { "threshold": 2 }], // Stricter for healthcare

    // Prevent Healthcare Data Leaks
    "no-debugger": "error",
    "no-alert": "error",
    "no-eval": "error",
    "no-implied-eval": "error",

    // Healthcare Function Purity
    "functional/no-let": "error", // Prefer immutable data
    "functional/prefer-readonly-type": "error", // All healthcare data should be readonly by default
    "functional/no-return-void": [
      "error",
      {
        "allowNull": false,
        "allowUndefined": false,
        "ignoreInferredTypes": false
      }
    ],
  },

  overrides: [
    // Test files can be less strict
    {
      files: ["**/*.test.ts", "**/*.spec.ts", "**/tests/**/*"],
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "functional/no-let": "off",
        "no-console": "off",
      }
    },

    // Migration files need flexibility
    {
      files: ["**/migrations/**/*", "**/seed.ts"],
      rules: {
        "functional/no-let": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
      }
    },

    // Healthcare API routes require strict validation
    {
      files: ["**/routes/**/*.ts", "**/api/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "security/detect-object-injection": "error",
        "no-console": "error", // No console logging in API routes
      }
    },

    // Healthcare database operations
    {
      files: ["**/repositories/**/*.ts", "**/services/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
        "functional/prefer-readonly-type": "error",
        "security/detect-possible-timing-attacks": "error",
      }
    }
  ]
};