import { path as toPath } from "./path";
import { lookupPathValue } from "./path-traversal";
import type { ObjectPath, PathInput, PathValue } from "./types";

/**
 * Reads a nested own property using a tuple path or dot/bracket notation.
 *
 * @example
 * ```ts
 * const user = { profile: { addresses: [{ city: "Durban" }] } } as const;
 *
 * get(user, ["profile", "addresses", 0, "city"]);
 * get(user, "profile.addresses[0].city");
 * ```
 */
export function get<T, const P extends ObjectPath>(
	object: T,
	path: P,
): PathValue<T, P> | undefined;
export function get<T, const P extends ObjectPath, D>(
	object: T,
	path: P,
	defaultValue: D,
): Exclude<PathValue<T, P>, undefined> | D;
export function get<T>(object: T, path: string): unknown;
export function get<T, D>(
	object: T,
	path: string,
	defaultValue: D,
): D | unknown;
/**
 * Gets the value at the specified path in an object.
 *
 * @param object - The object to read from
 * @param pathInput - The path to the value
 * @param defaultValue - The value to return when the path is not found
 * @returns The value at `pathInput`, or `defaultValue` when no value is found
 */
export function get<T, D>(
	object: T,
	pathInput: PathInput,
	defaultValue?: D,
): D | unknown {
	const result = lookupPathValue(object, toPath(pathInput));

	return result.found ? result.value : defaultValue;
}
