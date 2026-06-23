import { describe, expect, expectTypeOf, it } from "vitest";

import { mapKeys } from "../map-keys";

describe("mapKeys", () => {
	it("maps every own enumerable string key", () => {
		expect(
			mapKeys({ draft: 1, published: 2 }, (key) => `status_${key}`),
		).toEqual({
			status_draft: 1,
			status_published: 2,
		});
	});

	it("passes key, value, and object to the callback", () => {
		const source = { draft: 1, published: 2 };

		expect(
			mapKeys(
				source,
				(key, value, object) => `${key}:${value}:${object === source}`,
			),
		).toEqual({
			"draft:1:true": 1,
			"published:2:true": 2,
		});
	});

	it("does not mutate the input object", () => {
		const source = { draft: 1, published: 2 };

		mapKeys(source, (key) => key.toUpperCase());

		expect(source).toEqual({ draft: 1, published: 2 });
	});

	it("uses the last value when mapped keys collide", () => {
		expect(mapKeys({ a: 1, b: 2 }, () => "merged")).toEqual({
			merged: 2,
		});
	});

	it("returns the mapped key type with source value unions", () => {
		const source = { id: "1", active: true } as const;
		const result = mapKeys(source, (key) => `user_${key}` as const);

		expectTypeOf(result).toEqualTypeOf<
			Record<"user_id" | "user_active", "1" | true>
		>();
	});

	it("infers callback parameters from the source object", () => {
		const source = { id: "1", active: true } as const;

		mapKeys(source, (key, value, object) => {
			expectTypeOf(key).toEqualTypeOf<"id" | "active">();
			expectTypeOf(value).toEqualTypeOf<"1" | true>();
			expectTypeOf(object).toEqualTypeOf<typeof source>();

			return key;
		});
	});
});
