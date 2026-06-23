import { hasOwn } from "./has-own";

/**
 * Creates a new object containing only the selected own properties.
 *
 * Prefer the rest-key form for the strongest autocomplete and inference.
 *
 * @example
 * ```ts
 * const user = { id: "1", name: "Umsizi", role: "admin" } as const;
 *
 * pick(user, "name"); // { name: "Umsizi" }
 * pick(user, ["id", "role"] as const); // { id: "1", role: "admin" }
 * ```
 */
export function pick<T extends object, const Keys extends readonly (keyof T)[]>(
	object: T,
	...keys: Keys
): Pick<T, Keys[number]>;
export function pick<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	object: T,
	keys: readonly [FirstKey, ...RestKeys],
): Pick<T, FirstKey | RestKeys[number]>;
export function pick<T extends object>(
	object: T,
	keys: readonly (keyof T)[],
): Partial<T>;
export function pick<T extends object>(
	object: T,
	firstKeyOrKeys: keyof T | readonly (keyof T)[],
	...restKeys: readonly (keyof T)[]
): Partial<T> {
	const keys = (
		Array.isArray(firstKeyOrKeys)
			? firstKeyOrKeys
			: [firstKeyOrKeys, ...restKeys]
	) as readonly (keyof T)[];
	const result: Partial<T> = {};

	for (const key of keys) {
		if (hasOwn(object, key)) {
			result[key] = object[key];
		}
	}

	return result;
}
