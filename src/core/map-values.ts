import { typedKeys } from "./typed-keys";
import type { MappedValues, ValueMapper } from "./types";

/**
 * Maps the values of an object's own enumerable string-keyed properties while
 * preserving the original key set.
 *
 * @example
 * ```ts
 * const counts = { draft: 1, published: 2 };
 *
 * mapValues(counts, (value) => value * 2);
 * // { draft: 2, published: 4 }
 * ```
 */
export function mapValues<T extends object, R>(
	object: T,
	mapper: ValueMapper<T, R>,
): MappedValues<T, R> {
	const result = {} as MappedValues<T, R>;

	for (const key of typedKeys(object)) {
		result[key] = mapper(object[key], key, object);
	}

	return result;
}
