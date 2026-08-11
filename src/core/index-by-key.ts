import type { IndexedByKey, KeyableKeyOf } from "./types";

/**
 * Creates an object that maps each item's key value to the item itself.
 *
 * Later items overwrite earlier items with the same key.
 *
 * @param items - Items to index.
 * @param key - The property whose value becomes each object's key.
 * @returns An object mapping each key value to the corresponding item.
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
