import { groupByKey } from "./group-by-key";
import type { KeyMatch } from "./types";

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
	K extends keyof L & keyof R,
>(
	leftItems: ReadonlyArray<L>,
	rightItems: ReadonlyArray<R>,
	key: K,
): Array<KeyMatch<Extract<L[K] & R[K], PropertyKey>, L, R>>;
export function matchByKey<
	L extends object,
	R extends object,
	LK extends keyof L,
	RK extends keyof R,
>(
	leftItems: ReadonlyArray<L>,
	rightItems: ReadonlyArray<R>,
	leftKey: LK,
	rightKey: RK,
): Array<KeyMatch<Extract<L[LK] & R[RK], PropertyKey>, L, R>>;
export function matchByKey<
	L extends object,
	R extends object,
	LK extends keyof L,
	RK extends keyof R,
>(
	leftItems: ReadonlyArray<L>,
	rightItems: ReadonlyArray<R>,
	leftKey: LK,
	rightKey?: RK,
): Array<KeyMatch<PropertyKey, L, R>> {
	const resolvedRightKey = (rightKey ?? leftKey) as keyof R;
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
