import { path as toPath } from "./path";
import { lookupPathValue } from "./path-traversal";
import type { PathInput } from "./types";

/**
 * Checks whether a nested own-property path exists.
 *
 * A resolved `undefined` value still counts as existing as long as every
 * segment is present as an own property.
 */
export function hasPath(object: unknown, pathInput: PathInput): boolean {
	return lookupPathValue(object, toPath(pathInput)).found;
}
