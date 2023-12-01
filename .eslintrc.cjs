// const vitestFiles = ['app/**/__tests__/**/*', 'app/**/*.{spec,test}.*']
// const testFiles = ['**/tests/**', ...vitestFiles]
// const appFiles = ['app/**']

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-empty-pattern": "off",
    "import/no-duplicates": ["warn", { "prefer-inline": true }],
    "import/consistent-type-specifier-style": ["warn", "prefer-inline"],
    "testing-library/no-await-sync-events": "off",
    "jest-dom/prefer-in-document": "off",
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["tsconfig.json"],
      },
      settings: {
        jest: {
          version: 28,
        },
      },
    },
  ],
};
