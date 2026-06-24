import { describe, expect, it } from "vitest";

import { deepClone } from "../deep-clone";

describe("deepClone", () => {
	it("clones nested plain objects", () => {
		const original = { profile: { name: "Ada", tags: ["admin"] } };
		const clone = deepClone(original);

		clone.profile.name = "Linus";
		clone.profile.tags.push("member");

		expect(original.profile.name).toBe("Ada");
		expect(original.profile.tags).toEqual(["admin"]);
		expect(clone).toEqual({
			profile: { name: "Linus", tags: ["admin", "member"] },
		});
	});

	it("clones arrays of objects independently", () => {
		const original = [{ id: "1" }, { id: "2" }];
		const clone = deepClone(original);
		const [originalFirst] = original;
		const [cloneFirst] = clone;

		if (!originalFirst || !cloneFirst) throw new Error("expected items");

		cloneFirst.id = "changed";

		expect(originalFirst.id).toBe("1");
	});

	it("clones Date values by timestamp", () => {
		const original = new Date(2020, 0, 1);
		const clone = deepClone(original);

		expect(clone).not.toBe(original);
		expect(clone.getTime()).toBe(original.getTime());
	});

	it("preserves symbol keys", () => {
		const symbol = Symbol("secret");
		const original = { [symbol]: "hidden", visible: "ok" };
		const clone = deepClone(original);

		expect(clone[symbol]).toBe("hidden");
		expect(clone.visible).toBe("ok");
	});

	it("returns non-plain object values by reference", () => {
		const map = new Map([["a", 1]]);
		const fn = () => "fn";
		const original = { map, fn };
		const clone = deepClone(original);

		expect(clone.map).toBe(map);
		expect(clone.fn).toBe(fn);
	});

	it("returns primitives unchanged", () => {
		expect(deepClone(1)).toBe(1);
		expect(deepClone("a")).toBe("a");
		expect(deepClone(null)).toBe(null);
		expect(deepClone(undefined)).toBe(undefined);
	});
});
