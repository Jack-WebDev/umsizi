import type { ObjectEntries } from "./types";

/**
 * Returns the own enumerable string-keyed entries of an object with preserved
 * key/value pairing.
 *
 * This is a typed wrapper around `Object.entries`.
 *
 * @example
 * ```ts
 * const user = { id: "1", active: true } as const;
 *
 * typedEntries(user); // [["id", "1"], ["active", true]]
 * ```
 */
export function typedEntries<T extends object>(object: T): ObjectEntries<T> {
	return Object.entries(object) as unknown as ObjectEntries<T>;
}
