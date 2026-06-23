import { typedKeys } from "./typed-keys";
import type { FilteredKeys, KeyGuard, KeyPredicate } from "./types";

/**
 * Filters an object's own enumerable string-keyed properties by key.
 *
 * Supports both boolean predicates and key type guards. The result remains
 * partial because any property may be removed at runtime.
 *
 * @example
 * ```ts
 * const metrics = { total: 5, temp_cache: 2, temp_jobs: 1 } as const;
 *
 * filterKeys(metrics, (key) => key.startsWith("temp_"));
 * // { temp_cache: 2, temp_jobs: 1 }
 * ```
 */
export function filterKeys<
	T extends object,
	S extends Extract<keyof T, string>,
>(object: T, predicate: KeyGuard<T, S>): FilteredKeys<T, S>;
export function filterKeys<T extends object>(
	object: T,
	predicate: KeyPredicate<T>,
): FilteredKeys<T, Extract<keyof T, string>>;
export function filterKeys<T extends object>(
	object: T,
	predicate: KeyPredicate<T>,
): FilteredKeys<T, Extract<keyof T, string>> {
	const result = {} as FilteredKeys<T, Extract<keyof T, string>>;

	for (const key of typedKeys(object)) {
		if (predicate(key, object[key], object)) {
			result[key] = object[key];
		}
	}

	return result;
}
