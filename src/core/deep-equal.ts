import { isPlainObject } from "./is-plain-object";

/**
 * Checks whether two values are structurally equal.
 *
 * Plain objects are compared by own key set and recursive value equality.
 * Arrays are compared by length and recursive, index-wise equality. `Date`
 * values are compared by timestamp. Everything else (Maps, Sets, `RegExp`,
 * functions, class instances) falls back to `Object.is()`, so those are
 * compared by reference rather than structurally.
 *
 * @example
 * ```ts
 * deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }); // true
 * deepEqual(Number.NaN, Number.NaN); // true
 * deepEqual(new Map(), new Map()); // false (compared by reference)
 * ```
 */
export function deepEqual(a: unknown, b: unknown): boolean {
	if (Object.is(a, b)) return true;

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;

		return a.every((item, index) => deepEqual(item, b[index]));
	}

	if (a instanceof Date && b instanceof Date) {
		return a.getTime() === b.getTime();
	}

	if (isPlainObject(a) && isPlainObject(b)) {
		const aKeys = Reflect.ownKeys(a);
		const bKeys = Reflect.ownKeys(b);

		if (aKeys.length !== bKeys.length) return false;

		return aKeys.every(
			(key) => Object.hasOwn(b, key) && deepEqual(a[key], b[key]),
		);
	}

	return false;
}
