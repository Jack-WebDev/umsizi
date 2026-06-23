/**
 * Returns `true` when an object has no own enumerable properties.
 *
 * Both string keys and symbol keys are considered. Non-enumerable properties
 * are ignored.
 *
 * @example
 * ```ts
 * isEmpty({}); // true
 * isEmpty({ id: "1" }); // false
 * ```
 */
export function isEmpty(object: object): boolean {
	if (Object.keys(object).length > 0) {
		return false;
	}

	for (const key of Object.getOwnPropertySymbols(object)) {
		if (Object.prototype.propertyIsEnumerable.call(object, key)) {
			return false;
		}
	}

	return true;
}
