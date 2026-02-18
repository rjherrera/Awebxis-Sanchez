import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";

const defaultRules = {
  "no-var": "error",
  "prefer-const": ["error", { destructuring: "all" }],
  "semi": ["error", "always"],
  "comma-dangle": ["error", "always-multiline"],
  "eqeqeq": ["error", "always"],
  "no-return-await": "error",
  "no-useless-catch": "error",
};

export default [
  {
    ignores: ["node_modules/**", "build/**", "dist/**", "coverage/**"],
  },

  js.configs.recommended,

  // backend
  {
    files: ["index.js", "src/**/*.js", "*config.*", "*.config.*"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        fetch: "readonly",
      },
    },
    rules: {
      ...defaultRules,
      "no-console": "off",
    },
  },
  // frontend
  {
    files: ["src/assets/js/**/*.{js,jsx}"],
    plugins: {
      react,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...defaultRules,
      "import/no-unresolved": "off",
    },
  },
  // ESM config files
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      ...defaultRules,
    },
  },
];
