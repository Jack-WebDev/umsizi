import { hasOwn } from "./has-own";
import { isRecord } from "./is-record";
import { typedKeys } from "./typed-keys";
import type { InferSchema, ObjectSchema } from "./types";

/**
 * Validates an unknown value against a schema of field validators.
 *
 * All schema keys must exist as own properties on the input object and every
 * field validator must accept its corresponding value.
 *
 * @example
 * ```ts
 * const isUser = validateObject(
 *   { id: "usr_1", active: true },
 *   schema({
 *     id: (value): value is string => typeof value === "string",
 *     active: (value): value is boolean => typeof value === "boolean",
 *   }),
 * );
 * ```
 */
export function validateObject<const T extends ObjectSchema>(
	value: unknown,
	definition: T,
): value is InferSchema<T> {
	if (!isRecord(value)) return false;

	for (const key of typedKeys(definition)) {
		if (!hasOwn(value, key)) return false;
		if (!(definition[key] as T[typeof key])(value[key])) return false;
	}

	return true;
}
