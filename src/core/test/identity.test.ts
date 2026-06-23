import { describe, expect, expectTypeOf, it } from "vitest";

import { identity } from "../identity";

describe("identity", () => {
	it("returns the same primitive value", () => {
		expect(identity("umsizi")).toBe("umsizi");
	});

	it("returns the same object reference", () => {
		const value = { name: "umsizi" };

		expect(identity(value)).toBe(value);
	});

	it("returns the same array reference", () => {
		const value = [1, 2, 3];

		expect(identity(value)).toBe(value);
	});

	it("handles falsy values without coercion", () => {
		expect(identity(0)).toBe(0);
		expect(identity(false)).toBe(false);
		expect(identity("")).toBe("");
		expect(identity(null)).toBe(null);
		expect(identity(undefined)).toBe(undefined);
	});

	it("handles NaN", () => {
		expect(identity(Number.NaN)).toBe(Number.NaN);
	});

	it("preserves the input type", () => {
		const value = { name: "umsizi", nested: { stable: true } } as const;
		const result = identity(value);

		expectTypeOf(result).toEqualTypeOf<typeof value>();
	});
});
