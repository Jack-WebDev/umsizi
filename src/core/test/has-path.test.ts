import { describe, expect, it } from "vitest";

import { hasPath } from "../has-path";

describe("hasPath", () => {
	it("returns true for existing nested paths", () => {
		const user = {
			profile: {
				addresses: [{ city: "Durban" }],
			},
		};

		expect(hasPath(user, ["profile", "addresses", 0, "city"])).toBe(true);
	});

	it("returns false when any path segment is missing", () => {
		const user = { profile: {} };

		expect(hasPath(user, "profile.addresses[0].city")).toBe(false);
	});

	it("counts an own undefined value as present", () => {
		const user = {
			profile: {
				nickname: undefined,
			},
		};

		expect(hasPath(user, ["profile", "nickname"])).toBe(true);
	});

	it("supports function objects as path roots", () => {
		const callable = Object.assign(() => "ok", {
			meta: {
				ready: true,
			},
		});

		expect(hasPath(callable, ["meta", "ready"])).toBe(true);
	});
});
