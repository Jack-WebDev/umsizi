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
});
