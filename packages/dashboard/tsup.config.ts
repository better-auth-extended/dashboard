import { defineConfig } from "tsup";

export default defineConfig({
	dts: true,
	target: "es2022",
	format: "esm",
	entry: [
		"src/index.ts",
		"src/types/index.ts",
		"src/source.ts",
		"src/framework/{next,react-router,tanstack}.tsx",
		"src/plugins/*/index.ts",
		"src/dashboard-plugin/index.ts",
		"src/dashboard-plugin/client.ts",
	],
});
