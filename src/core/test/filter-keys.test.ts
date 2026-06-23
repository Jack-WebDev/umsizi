import { describe, expect, expectTypeOf, it } from "vitest";

import { filterKeys } from "../filter-keys";

describe("filterKeys", () => {
	it("removes entries when a boolean predicate returns false", () => {
		expect(
			filterKeys({ id: "1", temp_cache: 2, temp_jobs: 3 }, (key) =>
				key.startsWith("temp_"),
			),
		).toEqual({
			temp_cache: 2,
			temp_jobs: 3,
		});
	});

	it("supports key type-guard predicates", () => {
		const source = { id: "1", active: true, role: "admin" } as const;
		const result = filterKeys(
			source,
			(key): key is "id" | "role" => key === "id" || key === "role",
		);

		expect(result).toEqual({
			id: "1",
			role: "admin",
		});
		expectTypeOf(result.id).toEqualTypeOf<"1" | undefined>();
		expectTypeOf(result.role).toEqualTypeOf<"admin" | undefined>();
	});

	it("passes key, value, and object to the callback", () => {
		const source = { a: 1, b: 2 };

		expect(
			filterKeys(
				source,
				(key, value, object) => object[key] === value && key === "b",
			),
		).toEqual({
			b: 2,
		});
	});

	it("does not mutate the input object", () => {
		const source = { a: 1, b: 2 };

		filterKeys(source, (key) => key === "a");

		expect(source).toEqual({ a: 1, b: 2 });
	});

	it("returns a partial object type for boolean predicates", () => {
		const source = { id: "1", active: true } as const;
		const result = filterKeys(source, () => true);

		expectTypeOf(result.id).toEqualTypeOf<"1" | undefined>();
		expectTypeOf(result.active).toEqualTypeOf<true | undefined>();
	});
});
