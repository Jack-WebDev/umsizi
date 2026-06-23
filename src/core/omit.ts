/**
 * Creates a new object excluding the selected own enumerable properties.
 *
 * Supports either a readonly array of keys or rest keys.
 *
 * @example
 * ```ts
 * const user = { id: "1", name: "Umsizi", role: "admin" } as const;
 *
 * omit(user, ["role"]); // { id: "1", name: "Umsizi" }
 * omit(user, "id", "name"); // { role: "admin" }
 * ```
 */
export function omit<T extends object, const K extends keyof T>(
	object: T,
	keys: readonly K[],
): Omit<T, K>;
export function omit<T extends object, const K extends keyof T>(
	object: T,
	firstKey: K,
	...restKeys: readonly K[]
): Omit<T, K>;
export function omit<T extends object, const K extends keyof T>(
	object: T,
	keysOrFirstKey: readonly K[] | K,
	...restKeys: readonly K[]
): Omit<T, K> {
	const keys = (
		Array.isArray(keysOrFirstKey)
			? keysOrFirstKey
			: [keysOrFirstKey, ...restKeys]
	) as readonly K[];
	const omittedKeys = new Set<PropertyKey>(keys as readonly PropertyKey[]);
	const result: Partial<Omit<T, K>> = {};

	for (const key of Reflect.ownKeys(object) as (keyof T)[]) {
		if (
			Object.prototype.propertyIsEnumerable.call(object, key) &&
			!omittedKeys.has(key)
		) {
			(result as T)[key] = object[key];
		}
	}

	return result as Omit<T, K>;
}
