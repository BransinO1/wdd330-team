import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["vite.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      "no-console": "warn",
    },
  },
]);
