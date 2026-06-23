import { describe, expect, expectTypeOf, it } from "vitest";

import { isRecord } from "../is-record";

describe("isRecord", () => {
	it("returns true for plain objects and null-prototype objects", () => {
		expect(isRecord({ id: "1" })).toBe(true);
		expect(isRecord(Object.create(null))).toBe(true);
	});

	it("returns false for null and non-record-like values", () => {
		expect(isRecord(null)).toBe(false);
		expect(isRecord([])).toBe(false);
		expect(isRecord(() => true)).toBe(false);
		expect(isRecord(new Date())).toBe(false);
		expect(isRecord(new Map())).toBe(false);
		expect(isRecord(new Set())).toBe(false);
	});

	it("returns false for class instances", () => {
		class User {
			constructor(readonly id: string) {}
		}

		expect(isRecord(new User("1"))).toBe(false);
	});

	it("narrows matching values to records", () => {
		const value: unknown = { id: "1" };

		if (isRecord(value)) {
			expectTypeOf(value).toEqualTypeOf<Record<PropertyKey, unknown>>();
		}
	});
});
