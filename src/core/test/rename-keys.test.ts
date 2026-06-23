import { describe, expect, expectTypeOf, it } from "vitest";

import { renameKeys } from "../rename-keys";

describe("renameKeys", () => {
	it("renames only the configured keys", () => {
		expect(
			renameKeys(
				{ id: "1", givenName: "Umsizi", role: "admin" },
				{ givenName: "name" },
			),
		).toEqual({
			id: "1",
			name: "Umsizi",
			role: "admin",
		});
	});

	it("does not mutate the input object", () => {
		const source = { id: "1", givenName: "Umsizi" };

		renameKeys(source, { givenName: "name" });

		expect(source).toEqual({ id: "1", givenName: "Umsizi" });
	});

	it("uses the last value when renamed keys collide", () => {
		expect(
			renameKeys({ first: 1, second: 2 }, { first: "id", second: "id" }),
		).toEqual({
			id: 2,
		});
	});

	it("preserves unmapped keys and renames mapped keys in the type", () => {
		const source = { id: "1", givenName: "Umsizi", active: true } as const;
		const result = renameKeys(source, { givenName: "name" } as const);

		expectTypeOf(result).toEqualTypeOf<{
			id: "1";
			name: "Umsizi";
			active: true;
		}>();
	});
});
