import { describe, expect, expectTypeOf, it } from "vitest";

import { typedEntries } from "../typed-entries";

describe("typedEntries", () => {
	it("returns own enumerable string-keyed entries in native order", () => {
		const value = { b: 2, a: 1, 0: 0 };

		expect(typedEntries(value)).toEqual([
			["0", 0],
			["b", 2],
			["a", 1],
		]);
	});

	it("excludes symbol-keyed entries", () => {
		const symbol = Symbol("secret");
		const value = { visible: true, [symbol]: "hidden" };

		expect(typedEntries(value)).toEqual([["visible", true]]);
	});

	it("ignores inherited properties", () => {
		const base = { inherited: true };
		const value = Object.create(base) as { own: string; inherited?: boolean };

		value.own = "umsizi";

		expect(typedEntries(value)).toEqual([["own", "umsizi"]]);
	});

	it("preserves key/value tuple pairing", () => {
		const value = { id: "1", active: true } as const;
		const entries = typedEntries(value);

		expectTypeOf(entries).toEqualTypeOf<
			Array<["id", "1"] | ["active", true]>
		>();
	});
});
