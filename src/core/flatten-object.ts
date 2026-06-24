import { isPlainObject } from "./is-plain-object";

const PATH_SPECIAL_CHARACTERS = /[.[\]]/;

function appendKey(prefix: string, key: string): string {
	if (PATH_SPECIAL_CHARACTERS.test(key)) {
		return `${prefix}['${key}']`;
	}

	return prefix === "" ? key : `${prefix}.${key}`;
}

function appendIndex(prefix: string, index: number): string {
	return `${prefix}[${index}]`;
}

function walk(
	value: unknown,
	prefix: string,
	result: Record<string, unknown>,
): void {
	if (Array.isArray(value) && value.length > 0) {
		for (const [index, item] of value.entries()) {
			walk(item, appendIndex(prefix, index), result);
		}
		return;
	}

	if (isPlainObject(value) && Object.keys(value).length > 0) {
		for (const key of Object.keys(value)) {
			walk(value[key], appendKey(prefix, key), result);
		}
		return;
	}

	if (prefix !== "") result[prefix] = value;
}

/**
 * Flattens a nested plain object into a single-level object whose keys use
 * the same dot/bracket notation `path()` parses.
 *
 * Empty nested objects and arrays are kept as leaf values rather than
 * dropped. Plain-object keys that look like array indices (e.g. `"0"`) are
 * not distinguished from array indices by `path()`'s grammar, so round
 * tripping such a key through `unflattenObject()` produces an array instead
 * of the original object — an existing limitation of `path()`'s segment
 * model, not specific to this utility.
 *
 * @example
 * ```ts
 * flattenObject({ profile: { addresses: [{ city: "Durban" }] } });
 * // { "profile.addresses[0].city": "Durban" }
 * ```
 */
export function flattenObject<T extends object>(
	object: T,
): Record<string, unknown> {
	const result: Record<string, unknown> = {};

	walk(object, "", result);

	return result;
}
