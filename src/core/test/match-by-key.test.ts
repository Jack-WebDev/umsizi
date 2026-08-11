import { describe, expect, expectTypeOf, it } from "vitest";

import { matchByKey } from "../match-by-key";

describe("matchByKey", () => {
	it("matches arrays using the same key on both sides", () => {
		const users = [
			{ id: "1", name: "Ada" },
			{ id: "2", name: "Linus" },
		] as const;
		const profiles = [
			{ id: "2", bio: "kernel" },
			{ id: "1", bio: "compiler" },
		] as const;

		expect(matchByKey(users, profiles, "id")).toEqual([
			{
				key: "1",
				left: { id: "1", name: "Ada" },
				right: { id: "1", bio: "compiler" },
			},
			{
				key: "2",
				left: { id: "2", name: "Linus" },
				right: { id: "2", bio: "kernel" },
			},
		]);
	});

	it("supports different keys on each side and duplicate right-side matches", () => {
		const users = [{ id: "1", name: "Ada" }] as const;
		const sessions = [
			{ userId: "1", token: "a" },
			{ userId: "1", token: "b" },
		] as const;

		expect(matchByKey(users, sessions, "id", "userId")).toEqual([
			{
				key: "1",
				left: { id: "1", name: "Ada" },
				right: { userId: "1", token: "a" },
			},
			{
				key: "1",
				left: { id: "1", name: "Ada" },
				right: { userId: "1", token: "b" },
			},
		]);
	});

	it("returns no matches when keys do not overlap", () => {
		expect(
			matchByKey([{ id: "1" }], [{ userId: "2" }], "id", "userId"),
		).toEqual([]);
	});

	it("preserves matched item types", () => {
		const result = matchByKey(
			[{ id: "1" as const, role: "admin" as const }],
			[{ userId: "1" as const, active: true as const }],
			"id",
			"userId",
		);

		expectTypeOf(result).toEqualTypeOf<
			Array<{
				key: "1";
				left: { id: "1"; role: "admin" };
				right: { userId: "1"; active: true };
			}>
		>();
	});

	it("rejects non-keyable match fields at compile time", () => {
		const left = [{ id: "1", meta: { active: true } }];
		const right = [{ userId: "1", details: { active: true } }];
		const shouldRunTypeChecks = false as boolean;

		if (shouldRunTypeChecks) {
			// @ts-expect-error non-keyable left field
			matchByKey(left, right, "meta", "userId");
			// @ts-expect-error non-keyable right field
			matchByKey(left, right, "id", "details");
		}

		expect(left).toHaveLength(1);
		expect(right).toHaveLength(1);
	});
});
