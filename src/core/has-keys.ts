import {
	getMissingKeys,
	isPlainObjectLike,
	resolveKeys,
} from "./object-key-helpers";

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
	T extends object,
	const Keys extends readonly (keyof T)[],
>(value: T, ...keys: Keys): value is T & Required<Pick<T, Keys[number]>>;
export function hasKeys<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	keys: readonly [FirstKey, ...RestKeys],
): value is T & Required<Pick<T, FirstKey | RestKeys[number]>>;
export function hasKeys<T extends object>(
	value: T,
	keys: readonly (keyof T)[],
): value is T;
export function hasKeys<T extends object>(
	value: T,
	firstKeyOrKeys: keyof T | readonly (keyof T)[],
	...restKeys: readonly (keyof T)[]
): boolean {
	if (!isPlainObjectLike(value)) {
		return false;
	}

	const keys = resolveKeys(firstKeyOrKeys, restKeys);

	return getMissingKeys(value, keys).length === 0;
}
