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

	it("ignores empty quoted path segments", () => {
		expect(path("settings[''].enabled")).toEqual(["settings", "enabled"]);
	});

	it("returns the original tuple when given an array path", () => {
		const input = ["profile", "name"] as const;
		const result = path(input);

		expect(result).toEqual(["profile", "name"]);
		expect(result).toBe(input);
	});

	it("reuses frozen cached paths for repeated string lookups", () => {
		const first = path("profile.addresses[0].city");
		const second = path("profile.addresses[0].city");

		expect(second).toBe(first);
		expect(Object.isFrozen(first)).toBe(true);
	});

	it("clears the cache when the path cache limit is exceeded", () => {
		const original = path("cache.original");

		for (let index = 0; index <= 200; index += 1) {
			path(`cache.entry${index}`);
		}

		const reparsed = path("cache.original");

		expect(reparsed).toEqual(["cache", "original"]);
		expect(reparsed).not.toBe(original);
	});
});
