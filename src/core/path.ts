import type { ObjectPath, PathInput, PathSegment } from "./types";

const BRACKET_PATH_SEGMENT_PATTERN =
	/[^.[\]]+|\[(?:([^"'[\]]+)|(["'])(.*?)\2)\]/g;

function toPathSegment(value: string): PathSegment {
	return /^\d+$/.test(value) ? Number(value) : value;
}

/**
 * Converts dot/bracket notation into a normalized object path array.
 *
 * @example
 * ```ts
 * path("profile.addresses[0].city");
 * // ["profile", "addresses", 0, "city"]
 * ```
 */
export function path(input: PathInput): ObjectPath {
	if (typeof input !== "string") {
		return [...input];
	}

	const source = input;
	const segments: PathSegment[] = [];

	for (const match of source.matchAll(BRACKET_PATH_SEGMENT_PATTERN)) {
		const [, bareSegment, , quotedSegment] = match;
		const segment = quotedSegment ?? bareSegment ?? match[0];

		if (segment !== "") {
			segments.push(toPathSegment(segment));
		}
	}

	return segments;
}
