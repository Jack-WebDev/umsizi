import { isPlainObject } from "./is-plain-object";

/**
 * Recursively clones arrays and plain objects.
 *
 * `Date` values are cloned by timestamp. Every other object-like value (Maps,
 * Sets, `RegExp`, functions, class instances) is returned by reference, the
 * same "non-plain objects are leaves" stance `mergeDefaults()` takes.
 *
 * Does not guard against circular references.
 *
 * @example
 * ```ts
 * const original = { profile: { tags: ["admin"] } };
 * const clone = deepClone(original);
 *
 * clone.profile.tags.push("member");
 * original.profile.tags; // ["admin"]
 * ```
 */
export function deepClone<T>(value: T): T {
	if (Array.isArray(value)) {
		return value.map((item) => deepClone(item)) as T;
	}

	if (value instanceof Date) {
		return new Date(value.getTime()) as T;
	}

	if (isPlainObject(value)) {
		const result: Record<PropertyKey, unknown> = {};

		for (const key of Reflect.ownKeys(value)) {
			result[key] = deepClone(value[key]);
		}

		return result as T;
	}

	return value;
}
