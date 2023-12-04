module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.js"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",

    project: "./tsconfig.json",
    allowImportExportEverywhere: true,
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    quotes: ["error", "double"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
