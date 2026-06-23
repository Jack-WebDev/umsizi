import type { StringKeyOf } from "./types";

/**
 * Returns the own enumerable string keys of an object with preserved key types.
 *
 * This is a typed wrapper around `Object.keys`.
 *
 * @example
 * ```ts
 * const user = { id: "1", name: "Umsizi" } as const;
 *
 * typedKeys(user); // ["id", "name"]
 * ```
 */
export function typedKeys<T extends object>(object: T): Array<StringKeyOf<T>> {
	return Object.keys(object) as Array<StringKeyOf<T>>;
}
