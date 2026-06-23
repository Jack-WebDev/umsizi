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
export function typedFromEntries<
	const T extends ReadonlyArray<readonly [PropertyKey, unknown]>,
>(entries: T): { [K in T[number] as K[0]]: K[1] } {
	return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
}
