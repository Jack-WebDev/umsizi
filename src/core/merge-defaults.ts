import { isPlainObject } from "./is-plain-object";
import { typedKeys } from "./typed-keys";
import type { MergeDefaulted } from "./types";

/**
 * Recursively fills missing or `undefined` properties from a defaults object.
 *
 * Only plain objects are merged deeply. Arrays and other object-like values are
 * treated as leaf values.
 */
export function mergeDefaults<T extends object, D extends object>(
	object: T,
	defaultValues: D,
): MergeDefaulted<T, D> {
	const result = { ...object } as Record<string, unknown>;

	for (const key of typedKeys(defaultValues)) {
		const value = result[key];
		const fallback = defaultValues[key];

		result[key] =
			value === undefined
				? fallback
				: isPlainObject(value) && isPlainObject(fallback)
					? mergeDefaults(value, fallback)
					: value;
	}

	return result as MergeDefaulted<T, D>;
}
