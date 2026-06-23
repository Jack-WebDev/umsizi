/**
 * Next.js-oriented helpers for route and pathname normalization.
 *
 * @example
 * ```ts
 * import { normalizePathname } from "@umsizi/umsizi/next";
 *
 * normalizePathname("//dashboard///settings/"); // "/dashboard/settings"
 * ```
 *
 * @module
 */

/** Normalizes a path-like string for routing and pathname comparisons. */
export { normalizePathname } from "./normalize-pathname";
