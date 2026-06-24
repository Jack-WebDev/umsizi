import { describe, expect, expectTypeOf, it } from "vitest";

import { deepMerge } from "../deep-merge";

describe("deepMerge", () => {
	it("recursively merges nested plain objects with the source winning", () => {
		expect(
			deepMerge(
				{ profile: { name: "Ada", theme: "dark" } },
				{ profile: { theme: "light" } },
			),
		).toEqual({ profile: { name: "Ada", theme: "light" } });
	});

	it("overwrites defined target values, unlike mergeDefaults", () => {
		expect(deepMerge({ count: 1 }, { count: 2 })).toEqual({ count: 2 });
	});

	it("treats arrays as leaf values", () => {
		expect(deepMerge({ tags: ["current"] }, { tags: ["incoming"] })).toEqual({
			tags: ["incoming"],
		});
	});

	it("preserves non-plain objects instead of merging them", () => {
		const incomingDate = new Date("2026-01-01T00:00:00.000Z");

		const result = deepMerge(
			{ meta: { createdAt: new Date("2025-01-01T00:00:00.000Z") } },
			{ meta: { createdAt: incomingDate } },
		);

		expect(result.meta.createdAt).toBe(incomingDate);
	});

	it("adds keys present only in the source", () => {
		expect(deepMerge({ id: "1" }, { role: "admin" })).toEqual({
			id: "1",
			role: "admin",
		});
	});

	it("does not mutate either input", () => {
		const target = { profile: { name: "Ada" } };
		const source = { profile: { theme: "light" } };

		deepMerge(target, source);

		expect(target).toEqual({ profile: { name: "Ada" } });
		expect(source).toEqual({ profile: { theme: "light" } });
	});

	it("infers nested merged types", () => {
		const result = deepMerge(
			{ profile: { name: "Ada", theme: "dark" } },
			{ profile: { theme: "light" as const } },
		);

		expectTypeOf(result.profile.name).toEqualTypeOf<string>();
		expectTypeOf(result.profile.theme).toEqualTypeOf<"light">();
	});
});
