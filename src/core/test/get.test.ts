import { describe, expect, expectTypeOf, it } from "vitest";

import { get } from "../get";

describe("get", () => {
	it("reads nested values from tuple paths", () => {
		const user = {
			profile: {
				addresses: [{ city: "Durban" }],
			},
		} as const;

		expect(get(user, ["profile", "addresses", 0, "city"] as const)).toBe(
			"Durban",
		);
	});

	it("reads nested values from string paths", () => {
		const user = {
			profile: {
				addresses: [{ city: "Durban" }],
			},
		};

		expect(get(user, "profile.addresses[0].city")).toBe("Durban");
	});

	it("returns the default value when a path is missing", () => {
		const user = { profile: {} };

		expect(get(user, ["profile", "name"] as const, "unknown")).toBe("unknown");
	});

	it("does not treat an existing undefined value as missing", () => {
		const user = {
			profile: {
				nickname: undefined,
			},
		};

		expect(get(user, ["profile", "nickname"] as const, "fallback")).toBe(
			undefined,
		);
	});

	it("can read own properties from function objects", () => {
		const callable = Object.assign(() => "ok", {
			meta: {
				label: "worker",
			},
		});

		expect(get(callable, ["meta", "label"] as const)).toBe("worker");
	});

	it("preserves tuple-path inference", () => {
		const user = {
			profile: {
				addresses: [{ city: "Durban" as const }],
			},
		} as const;
		const result = get(user, ["profile", "addresses", 0, "city"] as const);

		expectTypeOf(result).toEqualTypeOf<"Durban" | undefined>();
	});
});
