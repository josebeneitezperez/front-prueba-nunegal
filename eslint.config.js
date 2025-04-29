import vue from "eslint-plugin-vue";
import prettierPlugin from "eslint-plugin-prettier";
import vueParser from "vue-eslint-parser";

export default [
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
    plugins: {
      vue: vue,
    },
    rules: {
      ...vue.configs["vue3-essential"].rules,
    },
  },
];
