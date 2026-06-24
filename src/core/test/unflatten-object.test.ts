import { describe, expect, it } from "vitest";

import { flattenObject } from "../flatten-object";
import { unflattenObject } from "../unflatten-object";

describe("unflattenObject", () => {
	it("reconstructs nested objects and arrays from path notation", () => {
		expect(unflattenObject({ "profile.addresses[0].city": "Durban" })).toEqual({
			profile: { addresses: [{ city: "Durban" }] },
		});
	});

	it("round trips through flattenObject", () => {
		const original = {
			profile: { addresses: [{ city: "Durban" }, { city: "Cape Town" }] },
			active: true,
		};

		expect(unflattenObject(flattenObject(original))).toEqual(original);
	});

	it("returns an empty object for an empty input", () => {
		expect(unflattenObject({})).toEqual({});
	});
});
