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

/** Asserts that a plain object has the given own keys. */
export { assertKeys } from "./src/core/assert-keys";

/** Creates a new object with all `null` and `undefined` values removed. */
export { compactObject } from "./src/core/compact-object";

/** Filters an object's own enumerable properties by value. */
export { filterValues } from "./src/core/filter-values";

/** Reads a nested own property using a tuple path or dot/bracket notation. */
export { get } from "./src/core/get";

/** Checks whether a plain object has the given own keys. */
export { hasKeys } from "./src/core/has-keys";

/** Checks whether an object has the given property as its own key. */
export { hasOwn } from "./src/core/has-own";

/** Checks whether a nested own-property path exists. */
export { hasPath } from "./src/core/has-path";

/** Returns the given value unchanged. */
export { identity } from "./src/core/identity";

/** Returns `true` when an object has no own enumerable properties. */
export { isEmpty } from "./src/core/is-empty";

/** Checks whether a value is a plain object. */
export { isPlainObject } from "./src/core/is-plain-object";

/** Checks whether a value is a record-like plain object. */
export { isRecord } from "./src/core/is-record";

/** Maps an object's own enumerable values while preserving its string keys. */
export { mapValues } from "./src/core/map-values";
/** Creates a new object excluding the selected own enumerable properties. */
export { omit } from "./src/core/omit";
/** Converts dot/bracket notation into a normalized object path array. */
export { path } from "./src/core/path";
/** Creates a new object containing only the selected own properties. */
export { pick } from "./src/core/pick";
/** Requires that a plain object has the given own keys. */
export { requireKeys } from "./src/core/require-keys";
/** Returns a new object with the nested path set to the given value. */
export { set } from "./src/core/set";
/** Returns the own enumerable string-keyed entries of an object. */
export { typedEntries } from "./src/core/typed-entries";
/** Creates an object from entries while preserving key and value types. */
export { typedFromEntries } from "./src/core/typed-from-entries";
/** Returns the own enumerable string keys of an object. */
export { typedKeys } from "./src/core/typed-keys";
