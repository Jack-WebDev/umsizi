import { isPlainObject } from "./is-plain-object";
import { path as toPath } from "./path";
import type { PathSegment } from "./types";

function createContainer(
	nextSegment: PathSegment | undefined,
): unknown[] | Record<string, unknown> {
	return typeof nextSegment === "number" ? [] : Object.create(null);
}

function isPathContainer(
	value: unknown,
): value is unknown[] | Record<PropertyKey, unknown> {
	return Array.isArray(value) || isPlainObject(value);
}

/**
 * Reconstructs a nested object from a flat object whose keys use dot/bracket
 * notation, the inverse of `flattenObject()`.
 *
 * @example
 * ```ts
 * unflattenObject({ "profile.addresses[0].city": "Durban" });
 * // { profile: { addresses: [{ city: "Durban" }] } }
 * ```
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
