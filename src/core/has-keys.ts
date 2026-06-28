import { isPlainObject } from "./is-plain-object";
import type { KeyedRecord, KeysFor, RequiredKeysResult } from "./types";

/**
 * Checks whether a plain object has all of the requested own keys.
 *
 * Prefer the rest-key form for the strongest autocomplete and inference.
 *
 * @example
 * ```ts
 * const user = { id: "1", role: "admin" } as const;
 *
 * hasKeys(user, "id", "role"); // true
 * hasKeys(user, ["id", "role"] as const); // true
 * ```
 */
export function hasKeys<
	T,
	const FirstKey extends KeysFor<T>,
	const RestKeys extends readonly KeysFor<T>[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): value is T &
	RequiredKeysResult<T, Extract<FirstKey | RestKeys[number], PropertyKey>>;
export function hasKeys<
	T,
	const FirstKey extends KeysFor<T>,
	const RestKeys extends readonly KeysFor<T>[],
>(
	value: T,
	keys: readonly [FirstKey, ...RestKeys],
): value is T &
	RequiredKeysResult<T, Extract<FirstKey | RestKeys[number], PropertyKey>>;
export function hasKeys<T>(
	value: T,
	keys: readonly KeysFor<T>[],
): value is T & KeyedRecord<T>;
/**
 * Determines whether a plain object has all requested own keys.
 *
 * @param value - The value to inspect.
 * @param firstKeyOrKeys - The first key to check, or a read-only array of keys.
 * @param restKeys - Additional keys to check when `firstKeyOrKeys` is a single key.
 * @returns `true` if `value` is a plain object with all requested own keys, `false` otherwise.
 */
export function hasKeys(
	value: unknown,
	firstKeyOrKeys: PropertyKey | readonly PropertyKey[],
	...restKeys: readonly PropertyKey[]
): boolean {
	if (!isPlainObject(value)) {
		return false;
	}

	const keys = Array.isArray(firstKeyOrKeys)
		? firstKeyOrKeys
		: [firstKeyOrKeys, ...restKeys];

	for (const key of keys) {
		if (!Object.hasOwn(value, key)) {
			return false;
		}
	}

	return true;
}
