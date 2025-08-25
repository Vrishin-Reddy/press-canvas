/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "prettier",
  ],
  env: { browser: true, node: true, es2023: true },
  ignorePatterns: ["dist", "reports", "node_modules"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
  },
};


