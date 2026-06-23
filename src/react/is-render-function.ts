export function isRenderFunction(
	value: unknown,
): value is (...args: readonly unknown[]) => unknown {
	return typeof value === "function";
}
