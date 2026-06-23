import { typedKeys } from "./typed-keys";

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
export function filterValues<T extends object, S extends T[keyof T]>(
	object: T,
	predicate: (
		value: T[Extract<keyof T, string>],
		key: Extract<keyof T, string>,
		object: T,
	) => value is Extract<S, T[Extract<keyof T, string>]>,
): Partial<{ [K in keyof T]: Extract<T[K], S> }>;
export function filterValues<T extends object>(
	object: T,
	predicate: (
		value: T[Extract<keyof T, string>],
		key: Extract<keyof T, string>,
		object: T,
	) => boolean,
): Partial<T>;
export function filterValues<T extends object, S extends T[keyof T]>(
	object: T,
	predicate: (
		value: T[Extract<keyof T, string>],
		key: Extract<keyof T, string>,
		object: T,
	) => boolean,
): Partial<T> | Partial<{ [K in keyof T]: Extract<T[K], S> }> {
	const result: Partial<T> = {};

	for (const key of typedKeys(object)) {
		const value = object[key];

		if (predicate(value, key, object)) {
			result[key] = value;
		}
	}

	return result;
}
