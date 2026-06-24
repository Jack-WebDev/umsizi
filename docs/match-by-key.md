# `matchByKey`

Matches items from two arrays when their key values are equal. Supports either the same key on both sides or separate left/right keys. Implemented on top of `groupByKey()`, so a right-side key with duplicate values produces one match per duplicate (a Cartesian product for that key).

## Signature

```ts
function matchByKey<L extends object, R extends object, K extends keyof L & keyof R>(
	leftItems: ReadonlyArray<L>,
	rightItems: ReadonlyArray<R>,
	key: K,
): Array<KeyMatch<Extract<L[K] & R[K], PropertyKey>, L, R>>;
function matchByKey<L extends object, R extends object, LK extends keyof L, RK extends keyof R>(
	leftItems: ReadonlyArray<L>,
	rightItems: ReadonlyArray<R>,
	leftKey: LK,
	rightKey: RK,
): Array<KeyMatch<Extract<L[LK] & R[RK], PropertyKey>, L, R>>;
```

## Example

```ts
import { matchByKey } from "umsizi";

matchByKey(
	[{ id: "1", name: "Ada" }],
	[{ userId: "1", status: "active" }],
	"id",
	"userId",
);
// [{ key: "1", left: { id: "1", name: "Ada" }, right: { userId: "1", status: "active" } }]
```

## Related

- [`groupByKey`](./group-by-key.md)
- [`indexByKey`](./index-by-key.md)
