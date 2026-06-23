import { typedKeys } from "./typed-keys";
import type { Defaulted } from "./types";

/**
 * Creates a new object by filling missing or `undefined` properties from a
 * defaults object.
 *
 * `null`, `false`, `0`, and other defined values are preserved as-is.
 */
export function defaults<T extends object, D extends object>(
	object: T,
	defaultValues: D,
): Defaulted<T, D> {
	const result = { ...object } as Record<string, unknown>;

	for (const key of typedKeys(defaultValues)) {
		if (result[key] === undefined) {
			result[key] = defaultValues[key];
		}
	}

	return result as Defaulted<T, D>;
}
