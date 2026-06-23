import { hasFileExtension } from "../../src/node/has-file-extension";

// A tiny build-tool style filter: only process source files, skip
// declaration files and source maps.
const files = ["index.ts", "index.d.ts", "index.js.map", "README.md"];

const sourceFiles = files.filter(
	(file) => hasFileExtension(file, "ts") && !hasFileExtension(file, "d.ts"),
);

console.log(sourceFiles);
// ["index.ts"]
