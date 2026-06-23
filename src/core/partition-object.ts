import { typedKeys } from "./typed-keys";
import type {
	PartitionedObject,
	PartitionedValues,
	ValueGuard,
	ValuePredicate,
} from "./types";

/**
 * Partitions an object's own enumerable string-keyed properties into matching
 * and non-matching objects.
 *
 * Supports both boolean predicates and type-guard predicates.
 *
 * @example
 * ```ts
 * const settings = { retries: 3, label: "ok", timeout: null } as const;
 *
 * partitionObject(settings, (value) => value !== null);
 * // [{ retries: 3, label: "ok" }, { timeout: null }]
 * ```
 */
export function partitionObject<
	T extends object,
	S extends T[Extract<keyof T, string>],
>(object: T, predicate: ValueGuard<T, S>): PartitionedValues<T, S>;
export function partitionObject<T extends object>(
	object: T,
	predicate: ValuePredicate<T>,
): PartitionedObject<T>;
export function partitionObject<T extends object>(
	object: T,
	predicate: ValuePredicate<T>,
): PartitionedObject<T> {
	const matching = {} as PartitionedObject<T>[0];
	const rest = {} as PartitionedObject<T>[1];

	for (const key of typedKeys(object)) {
		const value = object[key];

		if (predicate(value, key, object)) {
			(matching as Record<string, T[Extract<keyof T, string>]>)[key] = value;
			continue;
		}

		(rest as Record<string, T[Extract<keyof T, string>]>)[key] = value;
	}

	return [matching, rest];
}
