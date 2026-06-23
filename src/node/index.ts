/**
 * Node-oriented helpers for file path and filesystem-adjacent checks.
 *
 * @example
 * ```ts
 * import { hasFileExtension } from "@umsizi/umsizi/node";
 *
 * hasFileExtension("src/index.ts", ".ts"); // true
 * ```
 *
 * @module
 */

/** Checks whether a file path ends with the given extension. */
export { hasFileExtension } from "./has-file-extension";
