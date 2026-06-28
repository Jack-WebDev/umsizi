import type { EntryTuples, FromEntriesLastWriteWins } from "./types";

/**
 * Creates an object from entry tuples while preserving the inferred key and value types.
 *
 * @param entries - The entries used to build the object
 * @returns The object created from `entries`, with later entries taking precedence for duplicate keys
 */
export function typedFromEntries<const T extends EntryTuples>(
	entries: T,
): FromEntriesLastWriteWins<T> {
	return Object.fromEntries(entries) as FromEntriesLastWriteWins<T>;
}
