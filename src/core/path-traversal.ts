import { hasOwn } from "./has-own";
import type { ObjectPath } from "./types";

type PathLookup =
	| { found: true; value: unknown }
	| { found: false; value: undefined };

/**
 * Determines whether a value can be used as an object path target.
 *
 * @param value - The value to check
 * @returns `true` if `value` is a non-null object or function, `false` otherwise
 */
function isPathTarget(
	value: unknown,
): value is Record<PropertyKey, unknown> | Function {
	return (
		value !== null &&
		value !== undefined &&
		(typeof value === "object" || typeof value === "function")
	);
}

/**
 * Traverses a path on an object and reports whether every segment exists.
 *
 * @param object - The value to traverse.
 * @param segments - The path segments to resolve.
 * @returns `{ found: true, value }` when the full path exists, or `{ found: false, value: undefined }` when any segment is missing or cannot be traversed.
 */
export function lookupPathValue(
	object: unknown,
	segments: ObjectPath,
): PathLookup {
	let current = object;

	for (const segment of segments) {
		if (!isPathTarget(current) || !hasOwn(current, segment)) {
			return { found: false, value: undefined };
		}

		current = (current as Record<PropertyKey, unknown>)[segment];
	}

	return { found: true, value: current };
}
