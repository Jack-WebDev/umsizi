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

/** Recursively clones arrays and plain objects. */
export { deepClone } from "./src/core/deep-clone";

/** Checks whether two values are structurally equal. */
export { deepEqual } from "./src/core/deep-equal";

/** Recursively merges a source object into a target object. */
export { deepMerge } from "./src/core/deep-merge";

/** Creates a new object by filling missing or `undefined` properties. */
export { defaults } from "./src/core/defaults";

/** Computes the own-key differences between two objects. */
export { diffObject } from "./src/core/diff-object";

/** Filters an object's own enumerable properties by key. */
export { filterKeys } from "./src/core/filter-keys";

/** Filters an object's own enumerable properties by value. */
export { filterValues } from "./src/core/filter-values";

/** Flattens a nested plain object into dot/bracket-notation keys. */
export { flattenObject } from "./src/core/flatten-object";

/** Reads a nested own property using a tuple path or dot/bracket notation. */
export { get } from "./src/core/get";

/** Groups items by a property whose value can be used as an object key. */
export { groupByKey } from "./src/core/group-by-key";

/** Checks whether a plain object has the given own keys. */
export { hasKeys } from "./src/core/has-keys";

/** Checks whether an object has the given property as its own key. */
export { hasOwn } from "./src/core/has-own";

/** Checks whether a nested own-property path exists. */
export { hasPath } from "./src/core/has-path";

/** Returns the given value unchanged. */
export { identity } from "./src/core/identity";

/** Indexes items by a property whose value can be used as an object key. */
export { indexByKey } from "./src/core/index-by-key";

/** Inverts an object's own enumerable string-keyed properties. */
export { invertObject } from "./src/core/invert-object";

/** Returns `true` when an object has no own enumerable properties. */
export { isEmpty } from "./src/core/is-empty";

/** Checks whether a value is a plain object. */
export { isPlainObject } from "./src/core/is-plain-object";

/** Maps an object's own enumerable keys to new string keys. */
export { mapKeys } from "./src/core/map-keys";

/** Maps an object's own enumerable values while preserving its string keys. */
export { mapValues } from "./src/core/map-values";
/** Matches items from two arrays when their key values are equal. */
export { matchByKey } from "./src/core/match-by-key";
/** Recursively fills missing or `undefined` properties from defaults. */
export { mergeDefaults } from "./src/core/merge-defaults";
/** Creates a new object excluding the selected own enumerable properties. */
export { omit } from "./src/core/omit";
/** Validates and returns a typed object, throwing when validation fails. */
export { parseObject } from "./src/core/parse-object";
/** Partitions an object's own enumerable properties into two objects. */
export { partitionObject } from "./src/core/partition-object";
/** Converts dot/bracket notation into a normalized object path array. */
export { path } from "./src/core/path";
/** Creates a new object containing only the selected own properties. */
export { pick } from "./src/core/pick";
/** Renames selected own enumerable string-keyed properties. */
export { renameKeys } from "./src/core/rename-keys";
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
/** Reconstructs a nested object from dot/bracket-notation keys. */
export { unflattenObject } from "./src/core/unflatten-object";
/** Validates an unknown value against a schema of field validators. */
export { validateObject } from "./src/core/validate-object";
/** Creates a reusable function that applies deep defaults. */
export { withDefaults } from "./src/core/with-defaults";
