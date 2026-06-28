import { typedKeys } from "./typed-keys";
import type { KeyMapper, MappedKeys } from "./types";

/**
 * Creates a new object with remapped own enumerable string keys.
 *
 * The returned object has a null prototype. When multiple source keys map to
 * the same target key, the later assignment wins.
 *
 * @example
 * ```ts
 * const user = { id: "1", active: true } as const;
 *
 * mapKeys(user, (key) => `user_${key}`);
 * // { user_id: "1", user_active: true }
 * ```
 */
export function mapKeys<T extends object, R extends string>(
	object: T,
	mapper: KeyMapper<T, R>,
): MappedKeys<T, R> {
	const result = Object.create(null) as MappedKeys<T, R>;

	for (const key of typedKeys(object)) {
		const mappedKey = mapper(key, object[key], object);

		result[mappedKey] = object[key];
	}

	return result;
}
