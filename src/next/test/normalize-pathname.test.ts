import { describe, expect, it } from "vitest";

import { normalizePathname } from "../normalize-pathname";

describe("normalizePathname", () => {
	it("adds a leading slash when missing", () => {
		expect(normalizePathname("dashboard")).toBe("/dashboard");
	});

	it("collapses duplicate slashes", () => {
		expect(normalizePathname("//dashboard///settings")).toBe(
			"/dashboard/settings",
		);
	});

	it("preserves the root pathname", () => {
		expect(normalizePathname("/")).toBe("/");
	});
});
