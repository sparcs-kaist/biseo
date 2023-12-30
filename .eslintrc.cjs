// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./packages/*/tsconfig.json", "./tsconfig.json"],
  },
  plugins: ["import", "@typescript-eslint", "react"],
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.cjs"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        // Since airbnb javascript rules does not allow to import typescript files without extensions, we need to disable it
        ts: "never",
        tsx: "never",
      },
    ],
    "import/named": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        packageDir: [
          path.join(__dirname, "packages/web"),
          path.join(__dirname, "packages/api"),
          path.join(__dirname, "packages/interface"),
          ".",
        ],
      },
    ],
    "import/prefer-default-export": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        // function parameters cannot be reassigned for readability, except for the ones in the array
        ignorePropertyModificationsFor: ["socket", "state"],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["../*"],
            message:
              "Usage of relative parent imports is not allowed. Use path alias instead.",
          },
        ],
      },
    ],
    "radix": ["error", "as-needed"],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-uses-react": "off",
    "react/jsx-no-useless-fragment": [
      "error",
      {
        // this allows <>{value}</> syntax, where value is a string or a number
        allowExpressions: true,
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: ["css"],
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": [
      "error",
      {
        // default values of the optional props must be provided as function arguments
        functions: "defaultArguments",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json"],
      },
    },
    "react": {
      version: "18.2.0",
    },
  },
};
