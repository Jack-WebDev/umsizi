import { describe, expect, it } from "vitest";

import { flattenObject } from "../flatten-object";

describe("flattenObject", () => {
	it("flattens nested objects and arrays using path notation", () => {
		expect(
			flattenObject({ profile: { addresses: [{ city: "Durban" }] } }),
		).toEqual({ "profile.addresses[0].city": "Durban" });
	});

	it("keeps empty nested objects and arrays as leaf values", () => {
		expect(flattenObject({ tags: [], metadata: {} })).toEqual({
			tags: [],
			metadata: {},
		});
	});

	it("preserves falsy leaf values", () => {
		expect(flattenObject({ count: 0, active: false, label: "" })).toEqual({
			count: 0,
			active: false,
			label: "",
		});
	});

	it("quotes keys containing path-special characters", () => {
		expect(flattenObject({ settings: { "feature.flag": true } })).toEqual({
			"settings['feature.flag']": true,
		});
	});

	it("returns an empty object for an empty input", () => {
		expect(flattenObject({})).toEqual({});
	});
});
