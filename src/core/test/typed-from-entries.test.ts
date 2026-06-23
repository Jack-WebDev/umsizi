import { describe, expect, expectTypeOf, it } from "vitest";

import { typedFromEntries } from "../typed-from-entries";

describe("typedFromEntries", () => {
	it("builds an object from string, number, and symbol keys", () => {
		const symbol = Symbol("token");
		const value = typedFromEntries([
			["name", "umsizi"],
			[0, "zero"],
			[symbol, true],
		] as const);

		expect(value.name).toBe("umsizi");
		expect(value[0]).toBe("zero");
		expect(value[symbol]).toBe(true);
	});

	it("handles empty entry lists", () => {
		expect(typedFromEntries([] as const)).toEqual({});
	});

	it("uses last-write-wins runtime behavior for duplicate keys", () => {
		expect(
			typedFromEntries([
				["name", "first"],
				["name", "second"],
			] as const),
		).toEqual({ name: "second" });
	});

	it("preserves reconstructed object typing", () => {
		const value = typedFromEntries([
			["id", "1"],
			["active", true],
		] as const);

		expectTypeOf(value).toEqualTypeOf<{ id: "1"; active: true }>();
	});

	it("preserves symbol and number access types", () => {
		const symbol = Symbol("token");
		const value = typedFromEntries([
			[0, "zero"],
			[symbol, true],
		] as const);

		expectTypeOf(value[0]).toEqualTypeOf<"zero">();
		expectTypeOf(value[symbol]).toEqualTypeOf<true>();
	});
});
