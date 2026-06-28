import { isPlainObject } from "./is-plain-object";
import { path as toPath } from "./path";
import type { PathSegment } from "./types";

/**
 * Creates an empty container for the next path segment.
 *
 * @param nextSegment - The upcoming path segment.
 * @returns An empty array when `nextSegment` is a number; otherwise, an object with no prototype.
 */
function createContainer(
	nextSegment: PathSegment | undefined,
): unknown[] | Record<string, unknown> {
	return typeof nextSegment === "number" ? [] : Object.create(null);
}

/**
 * Determines whether a value can be used as a nested path container.
 *
 * @param value - The value to check
 * @returns `true` if the value is an array or a plain object, `false` otherwise.
 */
function isPathContainer(
	value: unknown,
): value is unknown[] | Record<PropertyKey, unknown> {
	return Array.isArray(value) || isPlainObject(value);
}

/**
 * Reconstructs a nested object from a flat object whose keys use dot and bracket notation.
 *
 * @example
 * ```ts
 * unflattenObject({ "profile.addresses[0].city": "Durban" });
 * // { profile: { addresses: [{ city: "Durban" }] } }
 * ```
 *
 * @param flat - The flat key-value map to expand into nested objects and arrays.
 * @returns The reconstructed nested object.
 */
export function unflattenObject(
	flat: Record<string, unknown>,
): Record<string, unknown> {
	const result: Record<string, unknown> = Object.create(null);

	for (const [key, value] of Object.entries(flat)) {
		const segments = toPath(key);

		if (segments.length === 0) {
			continue;
		}

		let current: Record<PropertyKey, unknown> | unknown[] = result;

		for (let index = 0; index < segments.length; index += 1) {
			const segment = segments[index] as PathSegment;
			const container = current as Record<PropertyKey, unknown>;

			if (index === segments.length - 1) {
				container[segment] = value;
				break;
			}

			const existing = container[segment];

			if (isPathContainer(existing)) {
				current = existing;
				continue;
			}

			const nextContainer = createContainer(segments[index + 1]);

			container[segment] = nextContainer;
			current = nextContainer;
		}
	}

	return result;
}
