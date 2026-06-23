import { describe, expect, expectTypeOf, it } from "vitest";

import { groupByKey } from "../group-by-key";

describe("groupByKey", () => {
	it("groups items by the provided property", () => {
		const users = [
			{ id: "1", role: "admin" },
			{ id: "2", role: "member" },
			{ id: "3", role: "admin" },
		] as const;

		expect(groupByKey(users, "role")).toEqual({
			admin: [
				{ id: "1", role: "admin" },
				{ id: "3", role: "admin" },
			],
			member: [{ id: "2", role: "member" }],
		});
	});

	it("returns an empty object for empty input", () => {
		expect(groupByKey([], "id")).toEqual({});
	});

	it("preserves grouped item types", () => {
		const users = [
			{ id: "1", role: "admin" as const },
			{ id: "2", role: "member" as const },
		];
		const result = groupByKey(users, "role");

		expectTypeOf(result.admin).toEqualTypeOf<typeof users | undefined>();
		expectTypeOf(result.member).toEqualTypeOf<typeof users | undefined>();
	});
});
