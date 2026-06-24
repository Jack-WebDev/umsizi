import { isPlainObject } from "./is-plain-object";
import { typedKeys } from "./typed-keys";
import type { DeepMerged } from "./types";

/**
 * Recursively merges a source object into a target object, with the
 * source's defined values always taking precedence.
 *
 * Unlike `mergeDefaults()`, which only fills missing or `undefined`
 * properties, `deepMerge()` overwrites every key present in `source`,
 * recursing only when both sides are plain objects at that key. Arrays and
 * other non-plain values in `source` replace the target's value wholesale.
 *
 * @example
 * ```ts
 * deepMerge(
 *   { profile: { name: "Ada", theme: "dark" }, tags: ["admin"] },
 *   { profile: { theme: "light" }, tags: ["member"] },
 * );
 * // { profile: { name: "Ada", theme: "light" }, tags: ["member"] }
 * ```
 */
export function deepMerge<T extends object, S extends object>(
	target: T,
	source: S,
): DeepMerged<T, S> {
	const result = { ...target } as Record<string, unknown>;

	for (const key of typedKeys(source)) {
		const targetValue = result[key];
		const sourceValue = source[key];

		result[key] =
			isPlainObject(targetValue) && isPlainObject(sourceValue)
				? deepMerge(targetValue, sourceValue)
				: sourceValue;
	}

	return result as DeepMerged<T, S>;
}
