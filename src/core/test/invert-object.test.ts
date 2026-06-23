import { describe, expect, expectTypeOf, it } from "vitest";

import { invertObject } from "../invert-object";

describe("invertObject", () => {
	it("swaps string values into keys", () => {
		expect(invertObject({ admin: "A", member: "M" } as const)).toEqual({
			A: "admin",
			M: "member",
		});
	});

	it("supports numeric values as property keys", () => {
		expect(invertObject({ ok: 200, created: 201 } as const)).toEqual({
			200: "ok",
			201: "created",
		});
	});

	it("does not mutate the input object", () => {
		const source = { admin: "A", member: "M" } as const;

		invertObject(source);

		expect(source).toEqual({ admin: "A", member: "M" });
	});

	it("uses the last key when values collide", () => {
		expect(
			invertObject({ first: "shared", second: "shared" } as const),
		).toEqual({
			shared: "second",
		});
	});

	it("inverts keys and values in the type", () => {
		const result = invertObject({ admin: "A", member: "M" } as const);

		expectTypeOf(result).toEqualTypeOf<{
			A: "admin";
			M: "member";
		}>();
	});
});
