import { hasOwn } from "./has-own";
import type { ObjectPath } from "./types";

type PathLookup =
	| { found: true; value: unknown }
	| { found: false; value: undefined };

function isPathTarget(
	value: unknown,
): value is Record<PropertyKey, unknown> | Function {
	return (
		value !== null &&
		value !== undefined &&
		(typeof value === "object" || typeof value === "function")
	);
}

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
