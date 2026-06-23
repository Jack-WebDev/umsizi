import { describe, expect, expectTypeOf, it } from "vitest";

import { hasKeys } from "../has-keys";

describe("hasKeys", () => {
	it("returns true when all requested own keys exist", () => {
		expect(hasKeys({ id: "1", role: "admin" }, "id", "role")).toBe(true);
	});

	it("returns true for present keys with undefined values", () => {
		const value: { id: string | undefined } = { id: undefined };

		expect(hasKeys(value, "id")).toBe(true);
	});

	it("returns false for null and non-object values", () => {
		expect(hasKeys(null as never as { id?: string }, "id")).toBe(false);
		expect(hasKeys("umsizi" as never as { id?: string }, "id")).toBe(false);
	});

	it("returns false for non-plain objects", () => {
		class User {
			constructor(readonly id: string) {}
		}

		expect(hasKeys([] as never as Array<unknown> & { id?: string }, "id")).toBe(
			false,
		);
		expect(hasKeys(new User("1") as User & { id?: string }, "id")).toBe(false);
	});

	it("returns false for missing and inherited keys", () => {
		const base = { inherited: true };
		const value = Object.create(base) as { id: string; inherited?: boolean };

		value.id = "1";

		expect(hasKeys(value, "id", "inherited")).toBe(false);
		expect(hasKeys(value, "missing" as keyof typeof value)).toBe(false);
	});

	it("supports symbol keys at runtime", () => {
		const symbol = Symbol("secret");
		const value = { [symbol]: true };

		expect(hasKeys(value, symbol)).toBe(true);
	});

	it("narrows optional properties to required in guarded branches", () => {
		const value: { id?: "1"; role?: "admin"; active: true } = {
			id: "1",
			role: "admin",
			active: true,
		};

		if (hasKeys(value, "id", "role")) {
			expectTypeOf(value.id).toEqualTypeOf<"1">();
			expectTypeOf(value.role).toEqualTypeOf<"admin">();
			expectTypeOf(value.active).toEqualTypeOf<true>();
		}
	});

	it("preserves exact key unions for readonly tuple arrays", () => {
		const value: { id?: "1"; role?: "admin"; active: true } = {
			id: "1",
			role: "admin",
			active: true,
		};

		if (hasKeys(value, ["id", "role"] as const)) {
			expectTypeOf(value.id).toEqualTypeOf<"1">();
			expectTypeOf(value.role).toEqualTypeOf<"admin">();
		}
	});

	it("falls back safely for widened key arrays", () => {
		const value: { id?: "1"; role?: "admin"; active: true } = {
			id: "1",
			role: "admin",
			active: true,
		};
		const keys: Array<keyof typeof value> = ["id", "role"];

		if (hasKeys(value, keys)) {
			expectTypeOf(value.id).toEqualTypeOf<"1" | undefined>();
			expectTypeOf(value.role).toEqualTypeOf<"admin" | undefined>();
		}
	});

	it("rejects invalid literal keys at compile time", () => {
		const value = { id: "1", role: "admin" } as const;
		const shouldRunTypeChecks = false as boolean;

		if (shouldRunTypeChecks) {
			// @ts-expect-error invalid key
			hasKeys(value, "missing");
			// @ts-expect-error invalid key in tuple literal
			hasKeys(value, ["id", "missing"] as const);
		}

		expect(value).toEqual({ id: "1", role: "admin" });
	});
});
