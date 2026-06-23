import { hasOwn } from "./has-own";
import { typedKeys } from "./typed-keys";
import type { RenamedKeys } from "./types";

/**
 * Renames selected own enumerable string-keyed properties using a key map.
 *
 * Unmapped keys are copied through unchanged. When multiple source keys resolve
 * to the same target key, the later assignment wins.
 *
 * @example
 * ```ts
 * const user = { id: "1", givenName: "Umsizi" } as const;
 *
 * renameKeys(user, { givenName: "name" });
 * // { id: "1", name: "Umsizi" }
 * ```
 */
export function renameKeys<
	T extends object,
	const M extends Partial<Record<Extract<keyof T, string>, string>>,
>(object: T, names: M): RenamedKeys<T, M> {
	const result = {} as RenamedKeys<T, M>;

	for (const key of typedKeys(object)) {
		const renamedKey = (hasOwn(names, key) ? names[key] : key) as string;

		(result as Record<string, T[Extract<keyof T, string>]>)[renamedKey] =
			object[key];
	}

	return result;
}
