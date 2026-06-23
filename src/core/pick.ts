import { hasOwn } from "./has-own";

/**
 * Creates a new object containing only the selected own properties.
 *
 * Supports either a readonly array of keys or rest keys.
 *
 * @example
 * ```ts
 * const user = { id: "1", name: "Umsizi", role: "admin" } as const;
 *
 * pick(user, ["id", "role"]); // { id: "1", role: "admin" }
 * pick(user, "name"); // { name: "Umsizi" }
 * ```
 */
export function pick<T extends object, const K extends keyof T>(
	object: T,
	keys: readonly K[],
): Pick<T, K>;
export function pick<T extends object, const K extends keyof T>(
	object: T,
	firstKey: K,
	...restKeys: readonly K[]
): Pick<T, K>;
export function pick<T extends object, const K extends keyof T>(
	object: T,
	keysOrFirstKey: readonly K[] | K,
	...restKeys: readonly K[]
): Pick<T, K> {
	const keys = (
		Array.isArray(keysOrFirstKey)
			? keysOrFirstKey
			: [keysOrFirstKey, ...restKeys]
	) as readonly K[];
	const result: Partial<Pick<T, K>> = {};

	for (const key of keys) {
		if (hasOwn(object, key)) {
			result[key] = object[key];
		}
	}

	return result as Pick<T, K>;
}
