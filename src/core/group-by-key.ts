import type { GroupedByKey, KeyableKeyOf } from "./types";

/**
 * Groups items by the value of a specified property.
 *
 * @param items - The items to group.
 * @param key - The property whose value becomes each group key.
 * @returns An object whose properties map each key value to the matching items.
 */
export function groupByKey<T extends object, K extends KeyableKeyOf<T>>(
	items: ReadonlyArray<T>,
	key: K,
): GroupedByKey<T, K> {
	const result = Object.create(null) as GroupedByKey<T, K>;

	for (const item of items) {
		const groupKey = item[key] as Extract<T[K], PropertyKey>;
		const existing = result[groupKey];

		if (existing) {
			existing.push(item);
			continue;
		}

		result[groupKey] = [item];
	}

	return result;
}
