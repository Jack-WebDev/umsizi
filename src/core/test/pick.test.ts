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
});
