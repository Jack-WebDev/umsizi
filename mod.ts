/**
 * TypeScript-first, framework-agnostic object utility helpers.
 *
 * Use the dedicated `react`, `next`, and `node` entrypoints for
 * framework-specific helpers.
 *
 * @example
 * ```ts
 * import { identity } from "@umsizi/umsizi";
 *
 * identity("umsizi"); // "umsizi"
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
