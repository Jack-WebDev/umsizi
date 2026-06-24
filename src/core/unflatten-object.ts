import { set } from "./set";

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
	let result: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(flat)) {
		result = set(result, key, value);
	}

	return result;
}
