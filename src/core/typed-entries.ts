/**
 * Returns the own enumerable string-keyed entries of an object with preserved
 * key/value pairing.
 *
 * This is a typed wrapper around `Object.entries`.
 *
 * @example
 * ```ts
 * const user = { id: "1", active: true } as const;
 *
 * typedEntries(user); // [["id", "1"], ["active", true]]
 * ```
 */
export function typedEntries<T extends object>(
	object: T,
): Array<
	{
		[K in Extract<keyof T, string>]: [K, T[K]];
	}[Extract<keyof T, string>]
> {
	return Object.entries(object) as Array<
		{
			[K in Extract<keyof T, string>]: [K, T[K]];
		}[Extract<keyof T, string>]
	>;
}
