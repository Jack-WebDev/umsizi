import { describe, expect, expectTypeOf, it } from "vitest";

import { hasOwn } from "../has-own";

describe("hasOwn", () => {
	it("returns true for own properties", () => {
		expect(hasOwn({ id: "1" }, "id")).toBe(true);
	});

	it("returns false for inherited and missing properties", () => {
		const base = { inherited: true };
		const value = Object.create(base) as { own: string; inherited?: boolean };

		value.own = "umsizi";

		expect(hasOwn(value, "inherited")).toBe(false);
		expect(hasOwn(value, "missing")).toBe(false);
	});

	it("works with symbol keys", () => {
		const symbol = Symbol("secret");
		const value = { [symbol]: true };

		expect(hasOwn(value, symbol)).toBe(true);
	});

	it("narrows keys in guarded branches", () => {
		const value = { id: "1", active: true } as const;
		const key = (Math.random() > 0.5 ? "id" : "missing") as
			| "id"
			| "active"
			| "missing";

		if (hasOwn(value, key)) {
			expectTypeOf(key).toEqualTypeOf<"id" | "active">();
			expectTypeOf(value[key]).toEqualTypeOf<"1" | true>();
		}
	});
});
