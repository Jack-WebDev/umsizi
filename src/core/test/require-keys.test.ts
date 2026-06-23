import { describe, expect, expectTypeOf, it } from "vitest";

import { requireKeys } from "../require-keys";

describe("requireKeys", () => {
	it("returns the same object reference on success", () => {
		const value: { id?: "1"; role?: "admin" } = { id: "1", role: "admin" };
		const result = requireKeys(value, "id", "role");

		expect(result).toBe(value);
	});

	it("narrows optional properties after assignment", () => {
		const value: { id?: "1"; role?: "admin"; active: true } = {
			id: "1",
			role: "admin",
			active: true,
		};
		const result = requireKeys(value, ["id", "role"] as const);

		expectTypeOf(result.id).toEqualTypeOf<"1">();
		expectTypeOf(result.role).toEqualTypeOf<"admin">();
		expectTypeOf(result.active).toEqualTypeOf<true>();
	});

	it("throws a type error with the missing key list", () => {
		expect(() =>
			requireKeys({ id: "1" } as { id?: string; role?: string }, "id", "role"),
		).toThrowError(new TypeError("Missing required keys: role"));
	});
});
