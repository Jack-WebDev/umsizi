import { hasKeys } from "./has-keys";
import { isPlainObject } from "./is-plain-object";
import type { KeyedRecord, KeysFor, RequiredKeysResult } from "./types";

/**
 * Requires that a plain object has all of the requested own keys.
 *
 * Prefer the rest-key form for the strongest autocomplete and inference.
 *
 * @example
 * ```ts
 * const user = { id: "1", role: "admin" } as const;
 * const result = requireKeys(user, "id", "role");
 *
 * result.id; // "1"
 * ```
 */
export function requireKeys<
	T,
	const FirstKey extends KeysFor<T>,
	const RestKeys extends readonly KeysFor<T>[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): RequiredKeysResult<T, Extract<FirstKey | RestKeys[number], PropertyKey>>;
export function requireKeys<
	T,
	const FirstKey extends KeysFor<T>,
	const RestKeys extends readonly KeysFor<T>[],
>(
	value: T,
	keys: readonly [FirstKey, ...RestKeys],
): RequiredKeysResult<T, Extract<FirstKey | RestKeys[number], PropertyKey>>;
export function requireKeys<T>(
	value: T,
	keys: readonly KeysFor<T>[],
): KeyedRecord<T>;
/**
 * Ensures that a value has the specified own keys.
 *
 * @param value - The value to check.
 * @param firstKeyOrKeys - The first required key, or the full list of required keys.
 * @param restKeys - Additional required keys when `firstKeyOrKeys` is a single key.
 * @returns The original value when all required keys are present.
 * @throws {TypeError} Thrown when one or more required keys are missing.
 */
export function requireKeys(
	value: unknown,
	firstKeyOrKeys: PropertyKey | readonly PropertyKey[],
	...restKeys: readonly PropertyKey[]
): KeyedRecord<unknown> {
	const keys = Array.isArray(firstKeyOrKeys)
		? firstKeyOrKeys
		: [firstKeyOrKeys, ...restKeys];

	if (hasKeys(value, keys)) {
		return value;
	}

	const missingKeys: PropertyKey[] = [];

	if (isPlainObject(value)) {
		for (const key of keys) {
			if (!Object.hasOwn(value, key)) {
				missingKeys.push(key);
			}
		}
	}

	if (missingKeys.length === 0) {
		missingKeys.push(...keys);
	}

	const label = missingKeys.length === 1 ? "key" : "keys";

	throw new TypeError(
		`Missing required ${label}: ${missingKeys.map(String).join(", ")}`,
	);
}
