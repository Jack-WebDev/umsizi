import { describe, expect, expectTypeOf, it } from "vitest";

import { assertKeys } from "../assert-keys";

describe("assertKeys", () => {
	it("does not throw when all keys are present", () => {
		expect(() =>
			assertKeys({ id: "1", role: "admin" } as const, "id", "role"),
		).not.toThrow();
	});

	it("narrows optional properties after invocation", () => {
		const value: { id?: "1"; role?: "admin"; active: true } = {
			id: "1",
			role: "admin",
			active: true,
		};

		assertKeys(value, "id", "role");

		expectTypeOf(value.id).toEqualTypeOf<"1">();
		expectTypeOf(value.role).toEqualTypeOf<"admin">();
		expectTypeOf(value.active).toEqualTypeOf<true>();
	});

	it("throws the same type error as requireKeys", () => {
		expect(() =>
			assertKeys(
				{ id: "1" } as { id?: string; role?: string },
				["id", "role"] as const,
			),
		).toThrowError(new TypeError("M:role"));
	});

	it("rejects invalid literal keys at compile time", () => {
		const value = { id: "1", role: "admin" } as const;
		const shouldRunTypeChecks = false as boolean;

		if (shouldRunTypeChecks) {
			// @ts-expect-error at least one key is required
			assertKeys(value);
			// @ts-expect-error invalid key
			assertKeys(value, "missing");
			// @ts-expect-error invalid key in tuple literal
			assertKeys(value, ["id", "missing"] as const);
		}

		expect(value).toEqual({ id: "1", role: "admin" });
	});
});
