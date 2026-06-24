import { describe, expect, expectTypeOf, it } from "vitest";

import { parseObject } from "../parse-object";

const userSchema = {
	id: (value: unknown): value is string => typeof value === "string",
	active: (value: unknown): value is boolean => typeof value === "boolean",
};

describe("parseObject", () => {
	it("returns the typed object when validation succeeds", () => {
		const value = parseObject({ id: "usr_1", active: true }, userSchema);

		expect(value).toEqual({ id: "usr_1", active: true });
		expectTypeOf(value.id).toEqualTypeOf<string>();
		expectTypeOf(value.active).toEqualTypeOf<boolean>();
	});

	it("throws when validation fails", () => {
		expect(() => parseObject({ id: "usr_1" }, userSchema)).toThrow(TypeError);
		expect(() => parseObject({ id: 1, active: true }, userSchema)).toThrow(
			"Invalid object.",
		);
	});
});
