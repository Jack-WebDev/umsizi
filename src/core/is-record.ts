import { isPlainObjectLike } from "./object-key-helpers";

/**
 * Checks whether a value is a record-like plain object.
 *
 * For DX and safe narrowing, this uses the same strict semantics as
 * `isPlainObject()`.
 *
 * @example
 * ```ts
 * const payload: unknown = { id: "1" };
 *
 * if (isRecord(payload)) {
 * 	payload.id;
 * }
 * ```
 */
export function isRecord(
	value: unknown,
): value is Record<PropertyKey, unknown> {
	return isPlainObjectLike(value);
}
