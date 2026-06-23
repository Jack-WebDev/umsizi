import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		react: "src/react/index.ts",
		next: "src/next/index.ts",
		node: "src/node/index.ts",
	},
	outDir: "dist",
	platform: "neutral",
	target: "es2022",
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
});
