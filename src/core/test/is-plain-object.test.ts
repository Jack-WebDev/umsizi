import { describe, expect, expectTypeOf, it } from "vitest";

import { isPlainObject } from "../is-plain-object";

describe("isPlainObject", () => {
	it("returns true for plain objects and null-prototype objects", () => {
		expect(isPlainObject({ id: "1" })).toBe(true);
		expect(isPlainObject(Object.create(null))).toBe(true);
	});

	it("returns false for null and non-object values", () => {
		expect(isPlainObject(null)).toBe(false);
		expect(isPlainObject("umsizi")).toBe(false);
		expect(isPlainObject(1)).toBe(false);
	});

	it("returns false for arrays, functions, boxed primitives, and built-ins", () => {
		expect(isPlainObject([])).toBe(false);
		expect(isPlainObject(() => true)).toBe(false);
		expect(isPlainObject(new String("umsizi"))).toBe(false);
		expect(isPlainObject(new Date())).toBe(false);
		expect(isPlainObject(new Map())).toBe(false);
		expect(isPlainObject(new Set())).toBe(false);
	});

	it("returns false for class instances", () => {
		class User {
			constructor(readonly id: string) {}
		}

		expect(isPlainObject(new User("1"))).toBe(false);
	});

	it("narrows matching values to records", () => {
		const value: unknown = { id: "1" };

		if (isPlainObject(value)) {
			expectTypeOf(value).toEqualTypeOf<Record<PropertyKey, unknown>>();
		}
	});
});
