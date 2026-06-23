import { describe, expect, expectTypeOf, it } from "vitest";

import { indexByKey } from "../index-by-key";

describe("indexByKey", () => {
	it("indexes items by the provided property", () => {
		const users = [
			{ id: "1", name: "Ada" },
			{ id: "2", name: "Linus" },
		] as const;

		expect(indexByKey(users, "id")).toEqual({
			1: { id: "1", name: "Ada" },
			2: { id: "2", name: "Linus" },
		});
	});

	it("uses last-write-wins for duplicate keys", () => {
		expect(
			indexByKey(
				[
					{ id: "1", name: "first" },
					{ id: "1", name: "second" },
				],
				"id",
			),
		).toEqual({
			1: { id: "1", name: "second" },
		});
	});

	it("preserves indexed value types", () => {
		const users = [{ id: "1" as const, active: true as const }];
		const result = indexByKey(users, "id");

		expectTypeOf(result["1"]).toEqualTypeOf<
			(typeof users)[number] | undefined
		>();
	});
});
