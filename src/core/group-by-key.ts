import type { GroupedByKey } from "./types";

/**
 * Groups items by a property whose value can be used as an object key.
 *
 * @example
 * ```ts
 * groupByKey(
 *   [
 *     { id: "1", role: "admin" },
 *     { id: "2", role: "member" },
 *     { id: "3", role: "admin" },
 *   ],
 *   "role",
 * );
 * // { admin: [...], member: [...] }
 * ```
 */
export function groupByKey<T extends object, K extends keyof T>(
	items: ReadonlyArray<T>,
	key: K,
): GroupedByKey<T, K> {
	const result = {} as GroupedByKey<T, K>;

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
