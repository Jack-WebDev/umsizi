import { hasOwn } from "./has-own";
import { path as toPath } from "./path";
import type { PathInput } from "./types";

/**
 * Checks whether a nested own-property path exists.
 *
 * A resolved `undefined` value still counts as existing as long as every
 * segment is present as an own property.
 */
export function hasPath(object: unknown, pathInput: PathInput): boolean {
	let current = object;

	for (const segment of toPath(pathInput)) {
		if (
			current === null ||
			current === undefined ||
			(typeof current !== "object" && typeof current !== "function") ||
			!hasOwn(current, segment)
		) {
			return false;
		}

		current = (current as Record<string | number, unknown>)[segment];
	}

	return true;
}
