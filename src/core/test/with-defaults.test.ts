import { describe, expect, expectTypeOf, it } from "vitest";

import { withDefaults } from "../with-defaults";

describe("withDefaults", () => {
	it("creates a reusable deep-defaults applier", () => {
		const applyDefaults = withDefaults({
			profile: {
				settings: {
					theme: "light",
					compact: true,
				},
			},
			role: "member",
		});

		expect(
			applyDefaults({
				profile: {
					settings: {
						theme: undefined,
					},
				},
			}),
		).toEqual({
			profile: {
				settings: {
					theme: "light",
					compact: true,
				},
			},
			role: "member",
		});
	});

	it("preserves the merged return type", () => {
		const applyDefaults = withDefaults({
			profile: {
				settings: {
					theme: "light",
				},
			},
			role: "member" as const,
		});

		const result = applyDefaults({
			profile: {
				settings: {
					theme: undefined as string | undefined,
				},
			},
		});

		expectTypeOf(result.profile.settings.theme).toEqualTypeOf<string>();
		expectTypeOf(result.role).toEqualTypeOf<"member">();
	});
});
