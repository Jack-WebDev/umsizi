import { describe, expect, expectTypeOf, it } from "vitest";

import { schema } from "../schema";
import { validateObject } from "../validate-object";

const userSchema = schema({
	id: (value: unknown): value is string => typeof value === "string",
	active: (value: unknown): value is boolean => typeof value === "boolean",
});

describe("validateObject", () => {
	it("returns true for matching objects", () => {
		expect(validateObject({ id: "usr_1", active: true }, userSchema)).toBe(
			true,
		);
	});

	it("returns false for non-objects, missing keys, and invalid field values", () => {
		expect(validateObject(null, userSchema)).toBe(false);
		expect(validateObject({ id: "usr_1" }, userSchema)).toBe(false);
		expect(validateObject({ id: 1, active: true }, userSchema)).toBe(false);
	});

	it("ignores extra properties", () => {
		expect(
			validateObject({ id: "usr_1", active: true, role: "admin" }, userSchema),
		).toBe(true);
	});

	it("narrows successful values to the schema-inferred object type", () => {
		const value: unknown = { id: "usr_1", active: true };

		if (validateObject(value, userSchema)) {
			expectTypeOf(value.id).toEqualTypeOf<string>();
			expectTypeOf(value.active).toEqualTypeOf<boolean>();
		}
	});
});
