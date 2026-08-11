import { describe, expect, expectTypeOf, it } from "vitest";

import { set } from "../set";

describe("set", () => {
	it("updates a nested value without mutating the source object", () => {
		const user = {
			profile: {
				name: "Umsizi",
				address: {
					city: "Durban",
				},
			},
			active: true,
		};

		const result = set(user, ["profile", "address", "city"], "Cape Town");

		expect(result).toEqual({
			profile: {
				name: "Umsizi",
				address: {
					city: "Cape Town",
				},
			},
			active: true,
		});
		expect(result).not.toBe(user);
		expect(result.profile).not.toBe(user.profile);
		expect(result.profile.address).not.toBe(user.profile.address);
		expect(result.active).toBe(user.active);
		expect(user.profile.address.city).toBe("Durban");
	});

	it("creates missing containers for string paths", () => {
		const result = set({}, "profile.addresses[0].city", "Durban");

		expect(result).toEqual({
			profile: {
				addresses: [{ city: "Durban" }],
			},
		});
	});

	it("preserves non-updated array items", () => {
		const user = {
			items: [{ name: "first" }, { name: "second" }],
		};

		const result = set(user, ["items", 1, "name"], "updated");

		expect(result.items[0]).toBe(user.items[0]);
		expect(result.items[1]).not.toBe(user.items[1]);
		expect(result.items[1]?.name).toBe("updated");
	});

	it("returns the original object when the path is empty", () => {
		const user = { profile: { name: "Umsizi" } };

		expect(set(user, [], "ignored")).toBe(user);
	});

	it("preserves tuple-path inference for overwritten leaf values", () => {
		const user = {
			profile: {
				name: "Umsizi" as const,
				address: {
					city: "Durban" as const,
				},
			},
			active: true as const,
		} as const;
		const result = set(
			user,
			["profile", "address", "city"] as const,
			"Cape Town" as const,
		);

		expectTypeOf(result.profile.name).toEqualTypeOf<"Umsizi">();
		expectTypeOf(result.profile.address.city).toEqualTypeOf<"Cape Town">();
		expectTypeOf(result.active).toEqualTypeOf<true>();
	});

	it("widens tuple-path writes when creating new nested properties", () => {
		const result = set(
			{ profile: {} },
			["profile", "nickname"] as const,
			"Umsizi",
		);

		expectTypeOf(result.profile.nickname).toEqualTypeOf<string>();
	});

	it("returns a loose record type for string paths", () => {
		const result = set({}, "profile.address.city", "Durban");

		expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>();
	});
});
