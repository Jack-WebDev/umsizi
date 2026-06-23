import { describe, expect, expectTypeOf, it } from "vitest";

import { defaults } from "../defaults";

describe("defaults", () => {
	it("fills missing and undefined properties without overwriting defined values", () => {
		expect(
			defaults(
				{ theme: "dark", pageSize: undefined, compact: false },
				{ theme: "light", pageSize: 20, compact: true, locale: "en" },
			),
		).toEqual({
			theme: "dark",
			pageSize: 20,
			compact: false,
			locale: "en",
		});
	});

	it("returns a new object", () => {
		const source = { theme: undefined };
		const result = defaults(source, { theme: "light" });

		expect(result).toEqual({ theme: "light" });
		expect(result).not.toBe(source);
	});

	it("infers a merged object shape", () => {
		const result = defaults(
			{ id: "1", active: undefined as boolean | undefined },
			{ active: true, role: "admin" as const },
		);

		expectTypeOf(result.id).toEqualTypeOf<string>();
		expectTypeOf(result.active).toEqualTypeOf<boolean>();
		expectTypeOf(result.role).toEqualTypeOf<"admin">();
	});
});
