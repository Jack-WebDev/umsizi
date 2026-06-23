import { readFile, writeFile } from "node:fs/promises";

const packageJsonPath = new URL("../package.json", import.meta.url);
const jsrJsonPath = new URL("../jsr.json", import.meta.url);

const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const jsrJson = JSON.parse(await readFile(jsrJsonPath, "utf8"));

if (
	typeof packageJson.version !== "string" ||
	packageJson.version.length === 0
) {
	throw new Error("package.json must contain a version string.");
}

if (jsrJson.version === packageJson.version) {
	process.exit(0);
}

jsrJson.version = packageJson.version;

await writeFile(jsrJsonPath, `${JSON.stringify(jsrJson, null, "\t")}\n`);
