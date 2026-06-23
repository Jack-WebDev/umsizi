import { typedKeys } from "./typed-keys";
import type { FilteredValues, ValueGuard, ValuePredicate } from "./types";

/**
 * Filters an object's own enumerable string-keyed properties by value.
 *
 * Supports both boolean predicates and type-guard predicates. The result type
 * remains partial because any property may be removed at runtime.
 *
 * @example
 * ```ts
 * const settings = { retries: 3, label: "", timeout: null } as const;
 *
 * filterValues(settings, (value) => value !== null);
 * // { retries: 3, label: "" }
 * ```
 */
export function filterValues<
	T extends object,
	S extends T[Extract<keyof T, string>],
>(object: T, predicate: ValueGuard<T, S>): FilteredValues<T, S>;
export function filterValues<T extends object>(
	object: T,
	predicate: ValuePredicate<T>,
): Partial<T>;
export function filterValues<T extends object>(
	object: T,
	predicate: ValuePredicate<T>,
): Partial<T> {
	const result: Partial<T> = {};

	for (const key of typedKeys(object)) {
		const value = object[key];

		if (predicate(value, key, object)) {
			result[key] = value;
		}
	}

	return result;
}
