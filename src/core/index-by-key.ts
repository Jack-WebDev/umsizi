import type { IndexedByKey, KeyableKeyOf } from "./types";

/**
 * Indexes items by a property whose value can be used as an object key.
 *
 * Later items overwrite earlier items with the same key.
 *
 * @example
 * ```ts
 * indexByKey(
 *   [
 *     { id: "1", name: "Ada" },
 *     { id: "2", name: "Linus" },
 *   ],
 *   "id",
 * );
 * // { 1: { ... }, 2: { ... } }
 * ```
 */
export function indexByKey<T extends object, K extends KeyableKeyOf<T>>(
	items: ReadonlyArray<T>,
	key: K,
): IndexedByKey<T, K> {
	const result = Object.create(null) as IndexedByKey<T, K>;

	for (const item of items) {
		result[item[key] as Extract<T[K], PropertyKey>] = item;
	}

	return result;
}
