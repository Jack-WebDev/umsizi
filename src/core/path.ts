import type { ObjectPath, PathInput, PathSegment } from "./types";

const BRACKET_PATH_SEGMENT_PATTERN =
	/[^.[\]]+|\[(?:([^"'[\]]+)|(["'])(.*?)\2)\]/g;
const PATH_CACHE_LIMIT = 200;
const pathCache = new Map<string, ObjectPath>();

/**
 * Converts a path segment to a number when it contains only digits.
 *
 * @param value - The segment text to convert
 * @returns The numeric value for digit-only input, or the original string
 */
function toPathSegment(value: string): PathSegment {
	return /^\d+$/.test(value) ? Number(value) : value;
}

/**
 * Normalizes a path input into an object path array.
 *
 * String inputs are parsed from dot and bracket notation, and non-string inputs are returned unchanged.
 *
 * @param input - The path input to normalize.
 * @returns A frozen object path for string input, or `input` unchanged when it is already a path.
 */
export function path(input: PathInput): ObjectPath {
	if (typeof input !== "string") {
		return input;
	}

	const cached = pathCache.get(input);

	if (cached) {
		return cached;
	}

	const segments: PathSegment[] = [];

	for (const match of input.matchAll(BRACKET_PATH_SEGMENT_PATTERN)) {
		const [, bareSegment, , quotedSegment] = match;
		const segment = quotedSegment ?? bareSegment ?? match[0];

		if (segment !== "") {
			segments.push(toPathSegment(segment));
		}
	}

	const result = Object.freeze(segments.slice()) as ObjectPath;

	if (pathCache.size >= PATH_CACHE_LIMIT) {
		pathCache.clear();
	}

	pathCache.set(input, result);

	return result;
}
