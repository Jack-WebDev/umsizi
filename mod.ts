/**
 * TypeScript-first utility helpers for object operations, routing strings,
 * file path checks, and render-function guards.
 *
 * Import framework-agnostic helpers from the package root, or use the
 * dedicated `react`, `next`, and `node` entrypoints when you want narrower
 * subpath imports.
 *
 * @example
 * ```ts
 * import { identity, normalizePathname } from "@umsizi/umsizi";
 *
 * identity("umsizi"); // "umsizi"
 * normalizePathname("dashboard"); // "/dashboard"
 * ```
 *
 * @module
 */

/** Creates a new object with all `null` and `undefined` values removed. */
export { compactObject } from "./src/core/compact-object";

/** Filters an object's own enumerable properties by value. */
export { filterValues } from "./src/core/filter-values";

/** Checks whether an object has the given property as its own key. */
export { hasOwn } from "./src/core/has-own";

/** Returns the given value unchanged. */
export { identity } from "./src/core/identity";

/** Returns `true` when an object has no own enumerable properties. */
export { isEmpty } from "./src/core/is-empty";

/** Maps an object's own enumerable values while preserving its string keys. */
export { mapValues } from "./src/core/map-values";
/** Creates a new object excluding the selected own enumerable properties. */
export { omit } from "./src/core/omit";
/** Creates a new object containing only the selected own properties. */
export { pick } from "./src/core/pick";
/** Returns the own enumerable string-keyed entries of an object. */
export { typedEntries } from "./src/core/typed-entries";
/** Creates an object from entries while preserving key and value types. */
export { typedFromEntries } from "./src/core/typed-from-entries";
/** Returns the own enumerable string keys of an object. */
export { typedKeys } from "./src/core/typed-keys";
/** Normalizes a path-like string for routing and pathname comparisons. */
export { normalizePathname } from "./src/next/normalize-pathname";

/** Checks whether a file path ends with the given extension. */
export { hasFileExtension } from "./src/node/has-file-extension";

/** Type guard for values that are callable in render-oriented code paths. */
export { isRenderFunction } from "./src/react/is-render-function";
