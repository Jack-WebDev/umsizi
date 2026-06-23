import { describe, expect, expectTypeOf, it } from "vitest";

import { partitionObject } from "../partition-object";

describe("partitionObject", () => {
	it("splits matching and non-matching values", () => {
		expect(
			partitionObject(
				{ retries: 3, label: "ok", timeout: null },
				(value) => value !== null,
			),
		).toEqual([{ retries: 3, label: "ok" }, { timeout: null }]);
	});

	it("supports type-guard predicates", () => {
		const source = { id: "1", active: true, retries: 3 } as const;
		const [matching, rest] = partitionObject(
			source,
			(value): value is "1" | 3 =>
				typeof value === "string" || typeof value === "number",
		);

		expect(matching).toEqual({
			id: "1",
			retries: 3,
		});
		expect(rest).toEqual({
			active: true,
		});
		expectTypeOf(matching).toEqualTypeOf<
			Partial<{ id: "1"; active: never; retries: 3 }>
		>();
		expectTypeOf(rest).toEqualTypeOf<
			Partial<{ id: never; active: true; retries: never }>
		>();
	});

	it("passes value, key, and object to the callback", () => {
		const source = { a: 1, b: 2 };

		expect(
			partitionObject(
				source,
				(value, key, object) => object[key] === value && key === "a",
			),
		).toEqual([{ a: 1 }, { b: 2 }]);
	});

	it("does not mutate the input object", () => {
		const source = { a: 1, b: 2 };

		partitionObject(source, (value) => value > 1);

		expect(source).toEqual({ a: 1, b: 2 });
	});
});
