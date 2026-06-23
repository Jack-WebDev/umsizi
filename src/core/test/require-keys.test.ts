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
		).toThrowError(new TypeError("M:role"));
	});

	it("throws the requested keys when the value is not a plain object", () => {
		const value = [] as unknown as Array<unknown> & { id?: string };

		expect(() => requireKeys(value, "id")).toThrowError(new TypeError("M:id"));
	});

	it("throws the requested keys when the value is not an object", () => {
		const value = "umsizi" as never as { id?: string };

		expect(() => requireKeys(value, "id")).toThrowError(new TypeError("M:id"));
	});

	it("rejects zero rest keys at compile time", () => {
		const value = { id: "1", role: "admin" } as const;
		const shouldRunTypeChecks = false as boolean;

		if (shouldRunTypeChecks) {
			// @ts-expect-error at least one key is required
			requireKeys(value);
		}

		expect(value).toEqual({ id: "1", role: "admin" });
	});
});
