import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    globals: true,
    include: [
      "src/lib/**/*.{test,spec}.ts",
      "src/lib/**/*.{test,spec}.tsx"
    ],
    exclude: [
      "src/components/__tests__/**",
      "src/pages/__tests__/**", 
      "src/api/__tests__/**",
      "api/**"
    ],
    coverage: {
      provider: "v8",
      reportsDirectory: "./reports/coverage",
      reporter: ["text", "html", "lcov", "json"],
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 85,
        lines: 85,
      },
    },
  },
});


