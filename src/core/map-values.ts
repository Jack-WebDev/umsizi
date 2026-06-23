import { typedKeys } from "./typed-keys";

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
	mapper: (
		value: T[Extract<keyof T, string>],
		key: Extract<keyof T, string>,
		object: T,
	) => R,
): { [K in keyof T]: R } {
	const result = {} as { [K in keyof T]: R };

	for (const key of typedKeys(object)) {
		result[key] = mapper(object[key], key, object);
	}

	return result;
}
