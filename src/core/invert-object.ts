import { typedKeys } from "./typed-keys";
import type { InvertedObject } from "./types";

/**
 * Inverts an object's own enumerable string-keyed properties into a prototype-less map.
 *
 * The returned object uses each property value as a key and the corresponding source key as the value.
 * If multiple source keys share the same value, the last one wins.
 *
 * @example
 * ```ts
 * const roles = { admin: "A", member: "M" } as const;
 *
 * invertObject(roles);
 * // { A: "admin", M: "member" }
 * ```
 *
 * @returns A new object whose keys are the source values and whose values are the source keys.
 */
export function invertObject<T extends Record<string, PropertyKey>>(
	object: T,
): InvertedObject<T> {
	const result = Object.create(null) as InvertedObject<T>;

	for (const key of typedKeys(object)) {
		const value = object[key] as PropertyKey;

		(result as Record<PropertyKey, string>)[value] = key;
	}

	return result;
}
