import { describe, expect, expectTypeOf, it } from "vitest";

import { identity } from "../identity";

describe("identity", () => {
	it("returns the same primitive value", () => {
		expect(identity("umsizi")).toBe("umsizi");
	});

	it("returns the same object reference", () => {
		const value = { name: "umsizi" };

		expect(identity(value)).toBe(value);
	});

	it("preserves the input type", () => {
		const value = { name: "umsizi", nested: { stable: true } } as const;
		const result = identity(value);

		expectTypeOf(result).toEqualTypeOf<typeof value>();
	});
});
