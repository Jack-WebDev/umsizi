import { typedKeys } from "./typed-keys";
import type { InvertedObject } from "./types";

/**
 * Inverts an object's own enumerable string-keyed properties.
 *
 * Source values must be valid property keys. When multiple source keys share
 * the same value, the later assignment wins.
 *
 * @example
 * ```ts
 * const roles = { admin: "A", member: "M" } as const;
 *
 * invertObject(roles);
 * // { A: "admin", M: "member" }
 * ```
 */
export function invertObject<T extends Record<string, PropertyKey>>(
	object: T,
): InvertedObject<T> {
	const result = {} as InvertedObject<T>;

	for (const key of typedKeys(object)) {
		const value = object[key] as PropertyKey;

		(result as Record<PropertyKey, string>)[value] = key;
	}

	return result;
}
