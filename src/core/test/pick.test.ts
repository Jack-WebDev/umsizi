import { describe, expect, expectTypeOf, it } from "vitest";

import { pick } from "../pick";

describe("pick", () => {
	it("supports the readonly key array form", () => {
		const user = { id: "1", name: "umsizi", role: "admin" } as const;

		expect(pick(user, ["id", "role"] as const)).toEqual({
			id: "1",
			role: "admin",
		});
	});

	it("supports the rest-key form", () => {
		const user = { id: "1", name: "umsizi", role: "admin" } as const;

		expect(pick(user, "name", "role")).toEqual({
			name: "umsizi",
			role: "admin",
		});
	});

	it("ignores inherited properties and does not mutate the source object", () => {
		const base = { inherited: true };
		const user = Object.create(base) as { id: string; inherited?: boolean };

		user.id = "1";

		expect(pick(user, ["id", "inherited"] as const)).toEqual({ id: "1" });
		expect(user).toEqual({ id: "1" });
	});

	it("preserves literal key inference", () => {
		const user = { id: "1", name: "umsizi", active: true } as const;
		const result = pick(user, ["id", "active"] as const);

		expectTypeOf(result.id).toEqualTypeOf<"1">();
		expectTypeOf(result.active).toEqualTypeOf<true>();
	});

	it("falls back to a partial object type for widened key arrays", () => {
		const user = { id: "1", name: "umsizi", active: true } as const;
		const keys: Array<keyof typeof user> = ["id", "active"];
		const result = pick(user, keys);

		expectTypeOf(result.id).toEqualTypeOf<"1" | undefined>();
		expectTypeOf(result.name).toEqualTypeOf<"umsizi" | undefined>();
		expectTypeOf(result.active).toEqualTypeOf<true | undefined>();
	});

	it("rejects invalid literal keys at compile time", () => {
		const user = { id: "1", name: "umsizi" } as const;

		// @ts-expect-error invalid key
		pick(user, "missing");
		// @ts-expect-error invalid key in tuple literal
		pick(user, ["id", "missing"] as const);

		expect(user).toEqual({ id: "1", name: "umsizi" });
	});
});
