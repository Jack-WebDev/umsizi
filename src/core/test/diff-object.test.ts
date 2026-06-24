import { describe, expect, expectTypeOf, it } from "vitest";

import { diffObject } from "../diff-object";

describe("diffObject", () => {
	it("reports added, removed, and changed keys", () => {
		expect(
			diffObject(
				{ id: "1", name: "Ada", role: "admin" },
				{ id: "1", name: "Ada Lovelace" },
			),
		).toEqual({
			added: {},
			removed: { role: "admin" },
			changed: { name: "Ada Lovelace" },
		});
	});

	it("reports newly added keys", () => {
		expect(diffObject({ id: "1" }, { id: "1", role: "admin" })).toEqual({
			added: { role: "admin" },
			removed: {},
			changed: {},
		});
	});

	it("does not flag structurally-equal nested values as changed", () => {
		expect(
			diffObject({ tags: ["admin", "member"] }, { tags: ["admin", "member"] }),
		).toEqual({ added: {}, removed: {}, changed: {} });
	});

	it("flags structurally-different nested values as changed", () => {
		expect(diffObject({ tags: ["admin"] }, { tags: ["member"] })).toEqual({
			added: {},
			removed: {},
			changed: { tags: ["member"] },
		});
	});

	it("returns empty buckets for identical objects", () => {
		const value = { id: "1", active: true };

		expect(diffObject(value, { ...value })).toEqual({
			added: {},
			removed: {},
			changed: {},
		});
	});

	it("infers the result shape", () => {
		const result = diffObject(
			{ id: "1", role: "admin" },
			{ id: "1", name: "Ada" },
		);

		expectTypeOf(result.added).toEqualTypeOf<Partial<{ name: string }>>();
		expectTypeOf(result.removed).toEqualTypeOf<Partial<{ role: string }>>();
		expectTypeOf(result.changed).toEqualTypeOf<Partial<{ id: string }>>();
	});
});
