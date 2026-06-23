import { describe, expect, it } from "vitest";

import { schema } from "../schema";

describe("schema", () => {
	it("returns the same schema definition", () => {
		const definition = schema({
			id: (value: unknown): value is string => typeof value === "string",
			active: (value: unknown): value is boolean => typeof value === "boolean",
		});

		expect(definition.id("usr_1")).toBe(true);
		expect(definition.active(true)).toBe(true);
	});

	it("preserves validator output types", () => {
		const definition = schema({
			id: (value: unknown): value is string => typeof value === "string",
			count: (value: unknown): value is number => typeof value === "number",
		});

		expect(definition.id("usr_1")).toBe(true);
		expect(definition.count(1)).toBe(true);
	});
});
