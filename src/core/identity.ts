/**
 * Returns the given value unchanged.
 *
 * Useful as a default callback, a type-inference anchor, or a no-op
 * placeholder where a transform function is expected.
 *
 * @example
 * ```ts
 * identity("umsizi"); // "umsizi"
 * ```
 */
export function identity<T>(value: T): T {
	return value;
}
