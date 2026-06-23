import { describe, expect, expectTypeOf, it } from "vitest";

import { filterValues } from "../filter-values";

describe("filterValues", () => {
	it("removes entries when a boolean predicate returns false", () => {
		expect(
			filterValues(
				{ retries: 3, label: "", timeout: null },
				(value) => value !== null,
			),
		).toEqual({
			retries: 3,
			label: "",
		});
	});

	it("supports type-guard predicates", () => {
		const value = { id: "1", enabled: true, retries: 3 } as const;
		const result = filterValues(
			value,
			(entry): entry is "1" | 3 =>
				typeof entry === "string" || typeof entry === "number",
		);

		expect(result).toEqual({
			id: "1",
			retries: 3,
		});
		expectTypeOf(result.id).toEqualTypeOf<"1" | undefined>();
		expectTypeOf(result.enabled).toEqualTypeOf<undefined>();
		expectTypeOf(result.retries).toEqualTypeOf<3 | undefined>();
	});

	it("passes value, key, and object to the callback", () => {
		const source = { a: 1, b: 2 };

		expect(
			filterValues(
				source,
				(value, key, object) => object[key] === value && key === "b",
			),
		).toEqual({
			b: 2,
		});
	});

	it("does not mutate the input object", () => {
		const source = { a: 1, b: 2 };

		filterValues(source, (value) => value > 1);

		expect(source).toEqual({ a: 1, b: 2 });
	});

	it("returns a partial object type for boolean predicates", () => {
		const source = { id: "1", active: true } as const;
		const result = filterValues(source, () => true);

		expectTypeOf(result.id).toEqualTypeOf<"1" | undefined>();
		expectTypeOf(result.active).toEqualTypeOf<true | undefined>();
	});

	it("excludes symbol and numeric keys from the result type", () => {
		const symbol = Symbol("secret");
		const source = { visible: "ok", 0: 1, [symbol]: true } as const;
		const result = filterValues(source, () => true);

		expectTypeOf(result).toEqualTypeOf<Partial<{ visible: "ok" }>>();
	});

	it("infers callback parameters predictably", () => {
		const source = { id: "1", active: true } as const;

		filterValues(source, (value, key, object) => {
			expectTypeOf(value).toEqualTypeOf<"1" | true>();
			expectTypeOf(key).toEqualTypeOf<"id" | "active">();
			expectTypeOf(object).toEqualTypeOf<typeof source>();

			return true;
		});
	});
});
