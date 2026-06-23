import { path as toPath } from "./path";
import type { PathInput, PathSegment } from "./types";

function isContainer(value: unknown): value is object {
	return typeof value === "object" && value !== null;
}

function createContainer(
	nextSegment: PathSegment | undefined,
): unknown[] | Record<string, unknown> {
	return typeof nextSegment === "number" ? [] : {};
}

function cloneContainer(value: unknown, nextSegment: PathSegment | undefined) {
	if (Array.isArray(value)) {
		return [...value];
	}

	if (isContainer(value)) {
		return Object.assign(
			Object.create(Object.getPrototypeOf(value)),
			value,
		) as Record<string | number, unknown>;
	}

	return createContainer(nextSegment);
}

function setAtPath(
	current: unknown,
	segments: readonly PathSegment[],
	value: unknown,
): unknown {
	const [segment, ...rest] = segments as readonly [
		PathSegment,
		...PathSegment[],
	];

	const clone = cloneContainer(current, segment) as Record<
		PropertyKey,
		unknown
	>;
	const existingValue =
		isContainer(current) || Array.isArray(current)
			? (current as Record<string | number, unknown>)[segment]
			: undefined;

	clone[segment] =
		rest.length === 0 ? value : setAtPath(existingValue, rest, value);

	return clone;
}

/**
 * Returns a new object with the nested path set to the given value.
 *
 * Missing containers are created automatically. Only the updated path is
 * cloned; untouched branches retain their existing references.
 */
export function set<T extends object>(
	object: T,
	pathInput: PathInput,
	value: unknown,
): T {
	const segments = toPath(pathInput);

	if (segments.length === 0) {
		return object;
	}

	return setAtPath(object, segments, value) as T;
}
