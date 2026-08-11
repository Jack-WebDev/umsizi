import { requireKeys } from "./require-keys";
import type { KeyedRecord, KeysFor, RequiredKeysResult } from "./types";

/**
 * Asserts that a plain object has all of the requested own keys.
 *
 * Prefer the rest-key form for the strongest autocomplete and inference.
 *
 * @example
 * ```ts
 * const user = { id: "1", role: "admin" } as const;
 *
 * assertKeys(user, "id", "role");
 * user.id; // "1"
 * ```
 */
export function assertKeys<
	T,
	const FirstKey extends KeysFor<T>,
	const RestKeys extends readonly KeysFor<T>[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): asserts value is T &
	RequiredKeysResult<T, Extract<FirstKey | RestKeys[number], PropertyKey>>;
export function assertKeys<
	T,
	const FirstKey extends KeysFor<T>,
	const RestKeys extends readonly KeysFor<T>[],
>(
	value: T,
	keys: readonly [FirstKey, ...RestKeys],
): asserts value is T &
	RequiredKeysResult<T, Extract<FirstKey | RestKeys[number], PropertyKey>>;
export function assertKeys<T>(
	value: T,
	keys: readonly KeysFor<T>[],
): asserts value is T & KeyedRecord<T>;
/**
 * Asserts that a value contains the specified keys.
 *
 * @param value - The value to check.
 * @param firstKeyOrKeys - A key to require, or an array of keys to require.
 * @param restKeys - Additional keys to require when `firstKeyOrKeys` is a single key.
 */
export function assertKeys(
	value: unknown,
	firstKeyOrKeys: PropertyKey | readonly PropertyKey[],
	...restKeys: readonly PropertyKey[]
): void {
	if (Array.isArray(firstKeyOrKeys)) {
		requireKeys(value, firstKeyOrKeys as readonly PropertyKey[]);
		return;
	}

	requireKeys(value, firstKeyOrKeys as PropertyKey, ...restKeys);
}
