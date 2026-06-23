/**
 * Creates a new object excluding the selected own enumerable properties.
 *
 * Prefer the rest-key form for the strongest autocomplete and inference.
 *
 * @example
 * ```ts
 * const user = { id: "1", name: "Umsizi", role: "admin" } as const;
 *
 * omit(user, "id", "name"); // { role: "admin" }
 * omit(user, ["role"] as const); // { id: "1", name: "Umsizi" }
 * ```
 */
export function omit<T extends object, const Keys extends readonly (keyof T)[]>(
	object: T,
	...keys: Keys
): Omit<T, Keys[number]>;
export function omit<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	object: T,
	keys: readonly [FirstKey, ...RestKeys],
): Omit<T, FirstKey | RestKeys[number]>;
export function omit<T extends object>(
	object: T,
	keys: readonly (keyof T)[],
): Partial<T>;
export function omit<T extends object>(
	object: T,
	firstKeyOrKeys: keyof T | readonly (keyof T)[],
	...restKeys: readonly (keyof T)[]
): Partial<T> {
	const keys = (
		Array.isArray(firstKeyOrKeys)
			? firstKeyOrKeys
			: [firstKeyOrKeys, ...restKeys]
	) as readonly (keyof T)[];
	const omittedKeys = new Set<PropertyKey>(keys as readonly PropertyKey[]);
	const result: Partial<T> = {};

	for (const key of Reflect.ownKeys(object) as (keyof T)[]) {
		if (
			Object.prototype.propertyIsEnumerable.call(object, key) &&
			!omittedKeys.has(key)
		) {
			(result as T)[key] = object[key];
		}
	}

	return result;
}
