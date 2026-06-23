import { describe, expect, it } from "vitest";

import { isRenderFunction } from "../is-render-function";

describe("isRenderFunction", () => {
	it("returns true for functions", () => {
		expect(isRenderFunction(() => "umsizi")).toBe(true);
	});

	it("returns false for non-functions", () => {
		expect(isRenderFunction("umsizi")).toBe(false);
	});
});
