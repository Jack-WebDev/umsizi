import type { EntryTuples, ObjectFromEntries } from "./types";

/**
 * Creates an object from entries while preserving the key and value types from
 * the input tuple array.
 *
 * This is a typed wrapper around `Object.fromEntries`.
 *
 * @example
 * ```ts
 * const status = typedFromEntries([
 *   ["id", "1"],
 *   ["active", true],
 * ] as const);
 *
 * // inferred as: { id: "1"; active: true }
 * ```
 */
export function typedFromEntries<const T extends EntryTuples>(
	entries: T,
): ObjectFromEntries<T> {
	return Object.fromEntries(entries) as ObjectFromEntries<T>;
}
