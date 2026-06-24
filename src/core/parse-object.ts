import type { InferSchema, ObjectSchema } from "./types";
import { validateObject } from "./validate-object";

/**
 * Parses an unknown value as a typed object by validating it against a schema.
 *
 * Throws a `TypeError` when validation fails.
 *
 * @example
 * ```ts
 * const user = parseObject(payload, {
 *   id: (value): value is string => typeof value === "string",
 *   active: (value): value is boolean => typeof value === "boolean",
 * });
 * ```
 */
export function parseObject<const T extends ObjectSchema>(
	value: unknown,
	definition: T,
): InferSchema<T> {
	if (validateObject(value, definition)) return value;

	throw new TypeError("Invalid object.");
}
