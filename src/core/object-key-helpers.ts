export function isPlainObjectLike(
	value: unknown,
): value is Record<PropertyKey, unknown> {
	if (value === null || typeof value !== "object") {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);

	return prototype === Object.prototype || prototype === null;
}

export function resolveKeys<K extends PropertyKey>(
	firstKeyOrKeys: K | readonly K[],
	restKeys: readonly K[],
): readonly K[] {
	return Array.isArray(firstKeyOrKeys)
		? firstKeyOrKeys
		: ([firstKeyOrKeys, ...restKeys] as readonly K[]);
}

export function getMissingKeys<K extends PropertyKey>(
	value: object,
	keys: readonly K[],
): K[] {
	return keys.filter((key) => !Object.hasOwn(value, key));
}

export function formatMissingKeys(keys: readonly PropertyKey[]): string {
	return keys.map((key) => String(key)).join(", ");
}
