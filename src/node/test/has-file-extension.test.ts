import { describe, expect, it } from "vitest";

import { hasFileExtension } from "../has-file-extension";

describe("hasFileExtension", () => {
	it("returns true when the file has the given extension", () => {
		expect(hasFileExtension("src/index.ts", ".ts")).toBe(true);
	});

	it("accepts extensions without a leading dot", () => {
		expect(hasFileExtension("package.json", "json")).toBe(true);
	});

	it("returns false when the extension does not match", () => {
		expect(hasFileExtension("README.md", "ts")).toBe(false);
	});

	it("is case-sensitive", () => {
		expect(hasFileExtension("archive.TAR", "tar")).toBe(false);
	});

	it("matches the final extension on multi-dot filenames", () => {
		expect(hasFileExtension("archive.tar.gz", "gz")).toBe(true);
		expect(hasFileExtension("archive.tar.gz", "tar")).toBe(false);
	});

	it("returns false for a path with no extension", () => {
		expect(hasFileExtension("Makefile", "mk")).toBe(false);
	});

	it("matches extensions on absolute paths", () => {
		expect(hasFileExtension("/usr/local/bin/script.sh", ".sh")).toBe(true);
	});
});
