import { hasKeys } from "./has-keys";
import {
	formatMissingKeys,
	getMissingKeys,
	isPlainObjectLike,
	resolveKeys,
} from "./object-key-helpers";

/**
 * Requires that a plain object has all of the requested own keys.
 *
 * Prefer the rest-key form for the strongest autocomplete and inference.
 *
 * @example
 * ```ts
 * const user = { id: "1", role: "admin" } as const;
 * const result = requireKeys(user, "id", "role");
 *
 * result.id; // "1"
 * ```
 */
export function requireKeys<
	T extends object,
	const Keys extends readonly (keyof T)[],
>(value: T, ...keys: Keys): T & Required<Pick<T, Keys[number]>>;
export function requireKeys<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	keys: readonly [FirstKey, ...RestKeys],
): T & Required<Pick<T, FirstKey | RestKeys[number]>>;
export function requireKeys<T extends object>(
	value: T,
	keys: readonly (keyof T)[],
): T;
export function requireKeys<T extends object>(
	value: T,
	firstKeyOrKeys: keyof T | readonly (keyof T)[],
	...restKeys: readonly (keyof T)[]
): T {
	const keys = resolveKeys(firstKeyOrKeys, restKeys);

	if (hasKeys(value, keys)) {
		return value;
	}

	const missingKeys = isPlainObjectLike(value)
		? getMissingKeys(value, keys)
		: keys;

	throw new TypeError(
		`Missing required keys: ${formatMissingKeys(missingKeys)}`,
	);
}
