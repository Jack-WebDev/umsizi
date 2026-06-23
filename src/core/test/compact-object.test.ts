import { describe, expect, expectTypeOf, it } from "vitest";

import { compactObject } from "../compact-object";

describe("compactObject", () => {
	it("removes only null and undefined values", () => {
		expect(
			compactObject({
				id: "1",
				nickname: null,
				description: undefined,
				active: false,
				count: 0,
				label: "",
			}),
		).toEqual({
			id: "1",
			active: false,
			count: 0,
			label: "",
		});
	});

	it("preserves NaN", () => {
		const value = compactObject({
			score: Number.NaN,
			fallback: null,
		});

		expect(value.score).toBe(Number.NaN);
		expect(value).toEqual({ score: Number.NaN });
	});

	it("does not mutate the input object", () => {
		const source = { id: "1", nickname: null };

		compactObject(source);

		expect(source).toEqual({ id: "1", nickname: null });
	});

	it("excludes nullish values from the result type", () => {
		const source = {
			id: "1" as const,
			nickname: null as string | null,
			active: true as boolean | undefined,
		};
		const result = compactObject(source);

		expectTypeOf(result).toEqualTypeOf<
			Partial<{ id: "1"; nickname: string; active: boolean }>
		>();
	});

	it("excludes symbol and numeric keys from the result type", () => {
		const symbol = Symbol("secret");
		const source = { visible: "ok", 0: null, [symbol]: "hidden" } as const;
		const result = compactObject(source);

		expectTypeOf(result).toEqualTypeOf<Partial<{ visible: "ok" }>>();
	});
});
