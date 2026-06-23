import { describe, expect, expectTypeOf, it } from "vitest";

import { mapValues } from "../map-values";

describe("mapValues", () => {
	it("maps every own enumerable string-keyed value", () => {
		expect(mapValues({ draft: 1, published: 2 }, (value) => value * 2)).toEqual(
			{
				draft: 2,
				published: 4,
			},
		);
	});

	it("passes value, key, and object to the callback", () => {
		const source = { draft: 1, published: 2 };

		expect(
			mapValues(
				source,
				(value, key, object) => `${key}:${value}:${object === source}`,
			),
		).toEqual({
			draft: "draft:1:true",
			published: "published:2:true",
		});
	});

	it("does not mutate the input object", () => {
		const source = { draft: 1, published: 2 };

		mapValues(source, (value) => value + 1);

		expect(source).toEqual({ draft: 1, published: 2 });
	});

	it("maps result values while preserving keys in the type", () => {
		const source = { id: "1", active: true } as const;
		const result = mapValues(source, (value) => String(value));

		expectTypeOf(result.id).toEqualTypeOf<string>();
		expectTypeOf(result.active).toEqualTypeOf<string>();
	});

	it("excludes symbol and numeric keys from the result type", () => {
		const symbol = Symbol("secret");
		const source = { visible: 1, 0: 2, [symbol]: 3 } as const;
		const result = mapValues(source, (value) => String(value));

		expectTypeOf(result).toEqualTypeOf<{ visible: string }>();
	});

	it("infers callback parameters from the source object", () => {
		const source = { id: "1", active: true } as const;

		mapValues(source, (value, key, object) => {
			expectTypeOf(value).toEqualTypeOf<"1" | true>();
			expectTypeOf(key).toEqualTypeOf<"id" | "active">();
			expectTypeOf(object).toEqualTypeOf<typeof source>();

			return String(value);
		});
	});
});
