import { describe, expect, it } from "vitest";

import { isRenderFunction } from "../is-render-function";

describe("isRenderFunction", () => {
	it("returns true for arrow functions", () => {
		expect(isRenderFunction(() => "umsizi")).toBe(true);
	});

	it("returns true for named function declarations", () => {
		function render() {
			return "umsizi";
		}

		expect(isRenderFunction(render)).toBe(true);
	});

	it("returns true for async functions", () => {
		expect(isRenderFunction(async () => "umsizi")).toBe(true);
	});

	it("returns true for generator functions", () => {
		expect(
			isRenderFunction(function* generator() {
				yield "umsizi";
			}),
		).toBe(true);
	});

	it("returns true for class constructors", () => {
		class Component {}

		expect(isRenderFunction(Component)).toBe(true);
	});

	it("returns false for strings", () => {
		expect(isRenderFunction("umsizi")).toBe(false);
	});

	it("returns false for null and undefined", () => {
		expect(isRenderFunction(null)).toBe(false);
		expect(isRenderFunction(undefined)).toBe(false);
	});

	it("returns false for plain objects and arrays", () => {
		expect(isRenderFunction({})).toBe(false);
		expect(isRenderFunction([])).toBe(false);
	});
});
