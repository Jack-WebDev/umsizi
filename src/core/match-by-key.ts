import { groupByKey } from "./group-by-key";
import type { KeyableKeyOf, KeyMatch } from "./types";

/**
 * Matches items from two arrays when their key values are equal.
 *
 * Supports either the same key on both sides or separate left/right keys.
 *
 * @example
 * ```ts
 * matchByKey(
 *   [{ id: "1", name: "Ada" }],
 *   [{ userId: "1", status: "active" }],
 *   "id",
 *   "userId",
 * );
 * // [{ key: "1", left: { ... }, right: { ... } }]
 * ```
 */
export function matchByKey<
	L extends object,
	R extends object,
	K extends KeyableKeyOf<L> & KeyableKeyOf<R>,
>(
	leftItems: ReadonlyArray<L>,
	rightItems: ReadonlyArray<R>,
	key: K,
): Array<KeyMatch<Extract<L[K] & R[K], PropertyKey>, L, R>>;
export function matchByKey<
	L extends object,
	R extends object,
	LK extends KeyableKeyOf<L>,
	RK extends KeyableKeyOf<R>,
>(
	leftItems: ReadonlyArray<L>,
	rightItems: ReadonlyArray<R>,
	leftKey: LK,
	rightKey: RK,
): Array<KeyMatch<Extract<L[LK] & R[RK], PropertyKey>, L, R>>;
/**
 * Matches items from two arrays by key.
 *
 * @param leftItems - The left-side items to match.
 * @param rightItems - The right-side items to match.
 * @param leftKey - The key to read from each left-side item.
 * @param rightKey - The key to read from each right-side item.
 * @returns An array of key match objects for each left and right item pair with the same key.
 */
export function matchByKey<
	L extends object,
	R extends object,
	LK extends KeyableKeyOf<L>,
	RK extends KeyableKeyOf<R>,
>(
	leftItems: ReadonlyArray<L>,
	rightItems: ReadonlyArray<R>,
	leftKey: LK,
	rightKey?: RK,
): Array<KeyMatch<PropertyKey, L, R>> {
	const resolvedRightKey = (rightKey ?? leftKey) as KeyableKeyOf<R>;
	const rightIndex = groupByKey(rightItems, resolvedRightKey) as Record<
		PropertyKey,
		Array<R> | undefined
	>;

	const matches: Array<KeyMatch<PropertyKey, L, R>> = [];

	for (const left of leftItems) {
		const key = left[leftKey] as PropertyKey;
		const matchingRights = rightIndex[key];

		if (!matchingRights) {
			continue;
		}

		for (const right of matchingRights) {
			matches.push({ key, left, right });
		}
	}

	return matches;
}
