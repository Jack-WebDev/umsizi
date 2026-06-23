import { describe, expect, expectTypeOf, it } from "vitest";

import { omit } from "../omit";

describe("omit", () => {
	it("supports the readonly key array form", () => {
		const user = { id: "1", name: "umsizi", role: "admin" } as const;

		expect(omit(user, ["role"] as const)).toEqual({
			id: "1",
			name: "umsizi",
		});
	});

	it("supports the rest-key form", () => {
		const user = { id: "1", name: "umsizi", role: "admin" } as const;

		expect(omit(user, "id", "name")).toEqual({
			role: "admin",
		});
	});

	it("ignores missing keys and does not mutate the source object", () => {
		const user = { id: "1", name: "umsizi" } as const;

		expect(omit(user, ["missing" as never] as const)).toEqual(user);
		expect(user).toEqual({ id: "1", name: "umsizi" });
	});

	it("excludes inherited properties from the result", () => {
		const base = { inherited: true };
		const user = Object.create(base) as { id: string; inherited?: boolean };

		user.id = "1";

		expect(omit(user, [] as const)).toEqual({ id: "1" });
	});

	it("preserves literal key inference", () => {
		const user = { id: "1", name: "umsizi", active: true } as const;
		const result = omit(user, ["name"] as const);

		expectTypeOf(result.id).toEqualTypeOf<"1">();
		expectTypeOf(result.active).toEqualTypeOf<true>();
	});

	it("falls back to a partial object type for widened key arrays", () => {
		const user = { id: "1", name: "umsizi", active: true } as const;
		const keys: Array<keyof typeof user> = ["name"];
		const result = omit(user, keys);

		expectTypeOf(result.id).toEqualTypeOf<"1" | undefined>();
		expectTypeOf(result.name).toEqualTypeOf<"umsizi" | undefined>();
		expectTypeOf(result.active).toEqualTypeOf<true | undefined>();
	});

	it("rejects invalid literal keys at compile time", () => {
		const user = { id: "1", name: "umsizi" } as const;

		// @ts-expect-error invalid key
		omit(user, "missing");
		// @ts-expect-error invalid key in tuple literal
		omit(user, ["id", "missing"] as const);

		expect(user).toEqual({ id: "1", name: "umsizi" });
	});
});
