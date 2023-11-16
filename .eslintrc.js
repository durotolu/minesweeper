module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
    // "plugin:react-hooks/recommended",
    // "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      // "files": [
      //     ".eslintrc.{js,cjs}"
      // ],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.js"],
      // extends: [
      //     'plugin:@typescript-eslint/recommended-requiring-type-checking',
      //   ],
      //   files: ['./**/*.{ts,tsx}'],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",

    // parser: '@typescript-eslint/parser',
    project: "./tsconfig.json",
    // tsconfigRootDir: __dirname,
    allowImportExportEverywhere: true,
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    quotes: ["error", "double"],
  },
  // "include": ["./.eslintrc.js"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
