import { describe, expect, it } from "vitest";

import { isEmpty } from "../is-empty";

describe("isEmpty", () => {
	it("returns true for empty objects and arrays", () => {
		expect(isEmpty({})).toBe(true);
		expect(isEmpty([])).toBe(true);
	});

	it("returns false for objects with enumerable string keys", () => {
		expect(isEmpty({ id: "1" })).toBe(false);
		expect(isEmpty([1])).toBe(false);
	});

	it("returns false for objects with enumerable symbol keys", () => {
		const symbol = Symbol("visible");
		const value = { [symbol]: true };

		expect(isEmpty(value)).toBe(false);
	});

	it("ignores non-enumerable properties", () => {
		const value = {};

		Object.defineProperty(value, "hidden", {
			value: true,
			enumerable: false,
		});

		expect(isEmpty(value)).toBe(true);
	});
});
