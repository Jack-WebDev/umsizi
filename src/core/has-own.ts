/**
 * Checks whether an object has the given property as its own key.
 *
 * This is a typed wrapper around `Object.hasOwn` that narrows the provided key
 * when the check succeeds.
 *
 * @example
 * ```ts
 * const user = { id: "1" };
 * const key: string = "id";
 *
 * if (hasOwn(user, key)) {
 *   user[key]; // key is narrowed to "id"
 * }
 * ```
 */
export function hasOwn<T extends object, K extends PropertyKey>(
	object: T,
	key: K,
): key is Extract<K, keyof T> {
	return Object.hasOwn(object, key);
}
