import { hasKeys } from "./has-keys";

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
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): T & Required<Pick<T, FirstKey | RestKeys[number]>>;
export function requireKeys<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	keys: readonly [FirstKey, ...RestKeys],
): T & Required<Pick<T, FirstKey | RestKeys[number]>>;
export function requireKeys<T extends object>(
	value: T,
	keys: readonly (keyof T)[],
): T;
export function requireKeys<T extends object>(
	value: T,
	firstKeyOrKeys: keyof T | readonly (keyof T)[],
	...restKeys: readonly (keyof T)[]
): T {
	const keys = Array.isArray(firstKeyOrKeys)
		? firstKeyOrKeys
		: ([firstKeyOrKeys, ...restKeys] as readonly (keyof T)[]);

	if (hasKeys(value, keys)) {
		return value;
	}

	const missingKeys: Array<keyof T> = [];

	if (value !== null && typeof value === "object") {
		const prototype = Object.getPrototypeOf(value);

		if (prototype === Object.prototype || prototype === null) {
			for (const key of keys) {
				if (!Object.hasOwn(value, key)) {
					missingKeys.push(key);
				}
			}
		}
	}

	if (missingKeys.length === 0) {
		missingKeys.push(...keys);
	}

	throw new TypeError(`M:${missingKeys.map(String).join()}`);
}
