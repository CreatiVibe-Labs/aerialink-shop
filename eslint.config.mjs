import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      //  Disable slow LCP <img> warnings
      "@next/next/no-img-element": "off",

      //  Allow unused variables (optional: warn instead of error)
      "@typescript-eslint/no-unused-vars": "off",

      //  Allow use of 'any'
      "@typescript-eslint/no-explicit-any": "off",

      //  Disable missing dependency warnings in hooks
      "react-hooks/exhaustive-deps": "off",

      //  General cleanups — disables other noise
      "react/jsx-no-undef": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];

export default eslintConfig;
