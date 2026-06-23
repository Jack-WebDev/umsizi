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
	if (value === null || typeof value !== "object") {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);

	return prototype === Object.prototype || prototype === null;
}
