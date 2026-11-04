import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  // Resolves the @/* alias from tsconfig.json.
  resolve: { tsconfigPaths: true },
  test: {
    // Plain logic tests run in Node. For component tests, add jsdom and
    // @testing-library/react and set `environment: "jsdom"`.
    environment: "node",
    include: ["**/*.test.{ts,tsx}"],
    // So `npm run check` stays green after the example tests are deleted.
    passWithNoTests: true,
    exclude: [...configDefaults.exclude, ".next/**"],
  },
});
