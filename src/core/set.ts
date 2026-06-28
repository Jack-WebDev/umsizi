import { path as toPath } from "./path";
import type { ObjectPath, PathSegment, SetPathValue } from "./types";

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
	segments: ObjectPath,
	value: unknown,
	index: number,
): unknown {
	const segment = segments[index] as PathSegment;
	const clone = cloneContainer(current, segment) as Record<
		PropertyKey,
		unknown
	>;
	const existingValue =
		Array.isArray(current) || isContainer(current)
			? (current as Record<string | number, unknown>)[segment]
			: undefined;

	clone[segment] =
		index === segments.length - 1
			? value
			: setAtPath(existingValue, segments, value, index + 1);

	return clone;
}

/**
 * Returns a new object with the nested path set to the given value.
 *
 * Missing containers are created automatically. Only the updated path is
 * cloned; untouched branches retain their existing references.
 */
export function set<T extends object, V>(
	object: T,
	pathInput: readonly [],
	value: V,
): T;
export function set<
	T extends object,
	const P extends readonly [PathSegment, ...PathSegment[]],
	V,
>(object: T, pathInput: P, value: V): SetPathValue<T, P, V>;
export function set(
	object: object,
	pathInput: string,
	value: unknown,
): Record<string, unknown>;
export function set<T extends object>(
	object: T,
	pathInput: string | readonly PathSegment[],
	value: unknown,
): T | Record<string, unknown> {
	const segments = toPath(pathInput);

	if (segments.length === 0) {
		return object;
	}

	return setAtPath(object, segments, value, 0) as T | Record<string, unknown>;
}
