import { typedKeys } from "./typed-keys";
import type { CompactedObject } from "./types";

/**
 * Creates a new object with all `null` and `undefined` values removed.
 *
 * Other falsy values such as `0`, `false`, `""`, and `NaN` are preserved.
 *
 * @example
 * ```ts
 * const user = { id: "1", nickname: null, active: false } as const;
 *
 * compactObject(user); // { id: "1", active: false }
 * ```
 */
export function compactObject<T extends object>(object: T): CompactedObject<T> {
	const result = {} as CompactedObject<T>;

	for (const key of typedKeys(object)) {
		const value = object[key];

		if (value != null) {
			result[key] = value as Exclude<T[typeof key], null | undefined>;
		}
	}

	return result;
}
