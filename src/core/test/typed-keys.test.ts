import { describe, expect, expectTypeOf, it } from "vitest";

import { typedKeys } from "../typed-keys";

describe("typedKeys", () => {
	it("returns own enumerable string keys in native order", () => {
		const value = { b: 2, a: 1, 0: 0 };

		expect(typedKeys(value)).toEqual(["0", "b", "a"]);
	});

	it("excludes symbol keys", () => {
		const symbol = Symbol("secret");
		const value = { visible: true, [symbol]: "hidden" };

		expect(typedKeys(value)).toEqual(["visible"]);
	});

	it("ignores inherited properties", () => {
		const base = { inherited: true };
		const value = Object.create(base) as { own: string; inherited?: boolean };

		value.own = "umsizi";

		expect(typedKeys(value)).toEqual(["own"]);
	});

	it("preserves literal key types", () => {
		const value = { id: "1", name: "umsizi" } as const;
		const keys = typedKeys(value);

		expectTypeOf(keys).toEqualTypeOf<Array<"id" | "name">>();
	});
});
