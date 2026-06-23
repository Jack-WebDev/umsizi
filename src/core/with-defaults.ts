import { mergeDefaults } from "./merge-defaults";
import type { MergeDefaulted } from "./types";

type DefaultsApplicator<D extends object> = <T extends object>(
	object: T,
) => MergeDefaulted<T, D>;

/**
 * Creates a reusable function that applies the provided defaults.
 */
export function withDefaults<D extends object>(
	defaultValues: D,
): DefaultsApplicator<D> {
	return <T extends object>(object: T): MergeDefaulted<T, D> =>
		mergeDefaults(object, defaultValues);
}
