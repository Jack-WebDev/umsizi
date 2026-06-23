import { requireKeys } from "./require-keys";

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
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): asserts value is T & Required<Pick<T, FirstKey | RestKeys[number]>>;
export function assertKeys<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	keys: readonly [FirstKey, ...RestKeys],
): asserts value is T & Required<Pick<T, FirstKey | RestKeys[number]>>;
export function assertKeys<T extends object>(
	value: T,
	keys: readonly (keyof T)[],
): asserts value is T;
export function assertKeys<T extends object>(
	value: T,
	firstKeyOrKeys: keyof T | readonly (keyof T)[],
	...restKeys: readonly (keyof T)[]
): void {
	requireKeys(value, firstKeyOrKeys as keyof T, ...restKeys);
}
