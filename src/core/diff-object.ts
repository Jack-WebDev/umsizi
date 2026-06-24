import { deepEqual } from "./deep-equal";
import { hasOwn } from "./has-own";
import { typedKeys } from "./typed-keys";
import type { ObjectDiff } from "./types";

/**
 * Computes the own-key differences between two objects.
 *
 * `added` holds keys present in `after` but not `before`, `removed` holds
 * keys present in `before` but not `after`, and `changed` holds keys present
 * in both whose values differ per `deepEqual()` — so structurally-equal
 * nested values are not flagged as changed even if their references differ.
 *
 * @example
 * ```ts
 * diffObject(
 *   { id: "1", name: "Ada", role: "admin" },
 *   { id: "1", name: "Ada Lovelace" },
 * );
 * // { added: {}, removed: { role: "admin" }, changed: { name: "Ada Lovelace" } }
 * ```
 */
export function diffObject<T extends object, U extends object>(
	before: T,
	after: U,
): ObjectDiff<T, U> {
	const added: Record<string, unknown> = {};
	const removed: Record<string, unknown> = {};
	const changed: Record<string, unknown> = {};

	for (const key of typedKeys(after)) {
		if (!hasOwn(before, key)) {
			added[key] = after[key];
			continue;
		}

		if (!deepEqual(before[key], after[key])) {
			changed[key] = after[key];
		}
	}

	for (const key of typedKeys(before)) {
		if (!hasOwn(after, key)) {
			removed[key] = before[key];
		}
	}

	return { added, removed, changed } as ObjectDiff<T, U>;
}
