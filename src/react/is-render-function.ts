/**
 * Type guard for values that are callable in render-oriented code paths
 * (e.g. `children` passed as a render prop).
 *
 * Matches any callable value, including async functions, generator
 * functions, and class constructors — it does not distinguish between
 * function kinds, only "is this safe to call as a function".
 *
 * @example
 * ```ts
 * const children: unknown = () => "ready";
 *
 * if (isRenderFunction(children)) {
 *   children();
 * }
 * ```
 */
export function isRenderFunction(
	value: unknown,
): value is (...args: readonly unknown[]) => unknown {
	return typeof value === "function";
}
