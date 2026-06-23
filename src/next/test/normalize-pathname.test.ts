import { describe, expect, it } from "vitest";

import { normalizePathname } from "../normalize-pathname";

describe("normalizePathname", () => {
	it("adds a leading slash when missing", () => {
		expect(normalizePathname("dashboard")).toBe("/dashboard");
	});

	it("collapses duplicate slashes", () => {
		expect(normalizePathname("//dashboard///settings")).toBe(
			"/dashboard/settings",
		);
	});

	it("preserves the root pathname", () => {
		expect(normalizePathname("/")).toBe("/");
	});

	it("normalizes an empty string to the root pathname", () => {
		expect(normalizePathname("")).toBe("/");
	});

	it("strips a trailing slash on non-root paths", () => {
		expect(normalizePathname("/dashboard/")).toBe("/dashboard");
	});

	it("collapses a path of only slashes to the root pathname", () => {
		expect(normalizePathname("///")).toBe("/");
	});

	it("does not parse or strip query strings", () => {
		expect(normalizePathname("dashboard?tab=billing")).toBe(
			"/dashboard?tab=billing",
		);
	});

	it("does not parse or strip fragments", () => {
		expect(normalizePathname("dashboard#section")).toBe("/dashboard#section");
	});

	it("leaves slashes inside the query string untouched", () => {
		expect(normalizePathname("dashboard?redirect=//evil.com")).toBe(
			"/dashboard?redirect=//evil.com",
		);
	});

	it("leaves slashes inside the fragment untouched", () => {
		expect(normalizePathname("dashboard#section//foo")).toBe(
			"/dashboard#section//foo",
		);
	});

	it("still normalizes the path segment when a query string is present", () => {
		expect(normalizePathname("//dashboard///settings?tab=billing")).toBe(
			"/dashboard/settings?tab=billing",
		);
	});

	it("preserves a single nested segment without duplicate slashes", () => {
		expect(normalizePathname("/dashboard/settings")).toBe(
			"/dashboard/settings",
		);
	});
});
