import { describe, expect, it } from "vitest";

import { deepEqual } from "../deep-equal";

describe("deepEqual", () => {
	it("compares nested plain objects structurally", () => {
		expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
		expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
	});

	it("ignores key order", () => {
		expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
	});

	it("treats different key sets as unequal", () => {
		expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
	});

	it("compares arrays by length and index", () => {
		expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
		expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
		expect(deepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
	});

	it("compares Date values by timestamp", () => {
		expect(deepEqual(new Date(2020, 0, 1), new Date(2020, 0, 1))).toBe(true);
		expect(deepEqual(new Date(2020, 0, 1), new Date(2020, 0, 2))).toBe(false);
	});

	it("treats NaN as equal to itself and distinguishes -0 from 0", () => {
		expect(deepEqual(Number.NaN, Number.NaN)).toBe(true);
		expect(deepEqual(0, -0)).toBe(false);
	});

	it("falls back to reference equality for non-plain objects", () => {
		const map = new Map([["a", 1]]);

		expect(deepEqual(map, map)).toBe(true);
		expect(deepEqual(new Map([["a", 1]]), new Map([["a", 1]]))).toBe(false);
	});
});
