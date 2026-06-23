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
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): value is T & Required<Pick<T, FirstKey | RestKeys[number]>>;
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
	if (value === null || typeof value !== "object") {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);

	if (prototype !== Object.prototype && prototype !== null) {
		return false;
	}

	const keys = Array.isArray(firstKeyOrKeys)
		? firstKeyOrKeys
		: ([firstKeyOrKeys, ...restKeys] as readonly (keyof T)[]);

	for (const key of keys) {
		if (!Object.hasOwn(value, key)) {
			return false;
		}
	}

	return true;
}
