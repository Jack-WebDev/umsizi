import { isPlainObjectLike } from "./object-key-helpers";

/**
 * Checks whether a value is a plain object with a prototype of
 * `Object.prototype` or `null`.
 *
 * Arrays, functions, boxed primitives, dates, maps, sets, and class instances
 * all return `false`.
 *
 * @example
 * ```ts
 * const payload: unknown = { id: "1" };
 *
 * if (isPlainObject(payload)) {
 * 	payload.id;
 * }
 * ```
 */
export function isPlainObject(
	value: unknown,
): value is Record<PropertyKey, unknown> {
	return isPlainObjectLike(value);
}
