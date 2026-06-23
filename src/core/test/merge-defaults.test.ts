import { describe, expect, expectTypeOf, it } from "vitest";

import { mergeDefaults } from "../merge-defaults";

describe("mergeDefaults", () => {
	it("deeply fills nested undefined and missing plain-object properties", () => {
		expect(
			mergeDefaults(
				{
					profile: {
						name: "Umsizi",
						settings: {
							theme: undefined,
						},
					},
				},
				{
					profile: {
						settings: {
							theme: "light",
							compact: true,
						},
						role: "admin",
					},
				},
			),
		).toEqual({
			profile: {
				name: "Umsizi",
				settings: {
					theme: "light",
					compact: true,
				},
				role: "admin",
			},
		});
	});

	it("treats arrays as leaf values", () => {
		expect(
			mergeDefaults(
				{ tags: undefined, items: ["current"] },
				{ tags: ["default"], items: ["fallback"] },
			),
		).toEqual({
			tags: ["default"],
			items: ["current"],
		});
	});

	it("preserves non-plain objects instead of merging them", () => {
		const currentDate = new Date("2026-01-01T00:00:00.000Z");
		const fallbackDate = new Date("2025-01-01T00:00:00.000Z");

		const result = mergeDefaults(
			{ meta: { createdAt: currentDate } },
			{ meta: { createdAt: fallbackDate, author: "Jack" } },
		);

		expect(result.meta.createdAt).toBe(currentDate);
		expect(result.meta.author).toBe("Jack");
	});

	it("infers nested merged types", () => {
		const result = mergeDefaults(
			{
				profile: {
					name: "Umsizi",
					settings: undefined as
						| {
								theme: string;
						  }
						| undefined,
				},
			},
			{
				profile: {
					settings: {
						theme: "light",
						compact: true,
					},
				},
			},
		);

		expectTypeOf(result.profile.name).toEqualTypeOf<string>();
		expectTypeOf(result.profile.settings.theme).toEqualTypeOf<string>();
		expectTypeOf(result.profile.settings.compact).toEqualTypeOf<boolean>();
	});
});
