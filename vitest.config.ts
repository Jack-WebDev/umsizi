import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		name: "umsizi",
		environment: "node",
		include: ["src/**/*.test.ts"],
		exclude: ["**/dist/**", "**/node_modules/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			include: ["src/**/*.ts"],
			exclude: ["src/**/index.ts", "src/**/test/**", "src/**/*.test.ts"],
			thresholds: {
				lines: 100,
				functions: 100,
				branches: 100,
				statements: 100,
			},
		},
	},
});
