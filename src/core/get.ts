import { hasOwn } from "./has-own";
import { path as toPath } from "./path";
import type { ObjectPath, PathInput, PathValue } from "./types";

function hasMissingPathSegment(
	value: unknown,
	segment: string | number,
): boolean {
	return (
		value === null ||
		value === undefined ||
		(typeof value !== "object" && typeof value !== "function") ||
		!hasOwn(value, segment)
	);
}

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
export function get<T, D>(
	object: T,
	pathInput: PathInput,
	defaultValue?: D,
): D | unknown {
	const segments = toPath(pathInput);
	let current: unknown = object;

	for (const segment of segments) {
		if (hasMissingPathSegment(current, segment)) {
			return defaultValue;
		}

		current = (current as Record<string | number, unknown>)[segment];
	}

	return current;
}
