import { describe, expect, it } from "vitest";

import { path } from "../path";

describe("path", () => {
	it("parses dot and bracket notation", () => {
		expect(path("profile.addresses[0].city")).toEqual([
			"profile",
			"addresses",
			0,
			"city",
		]);
	});

	it("supports quoted bracket keys", () => {
		expect(path("settings['feature.flag'].enabled")).toEqual([
			"settings",
			"feature.flag",
			"enabled",
		]);
	});

	it("returns a shallow copy when given an array path", () => {
		const input = ["profile", "name"] as const;
		const result = path(input);

		expect(result).toEqual(["profile", "name"]);
		expect(result).not.toBe(input);
	});
});
