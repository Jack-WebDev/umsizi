# `groupByKey`

Groups items by a property whose value can be used as an object key. The result type is `Partial`, since any particular group may have no matching items.

## Signature

```ts
function groupByKey<T extends object, K extends keyof T>(
	items: ReadonlyArray<T>,
	key: K,
): GroupedByKey<T, K>;
```

## Example

```ts
import { groupByKey } from "umsizi";

groupByKey(
	[
		{ id: "1", role: "admin" },
		{ id: "2", role: "member" },
		{ id: "3", role: "admin" },
	],
	"role",
);
// { admin: [...], member: [...] }
```

## Related

- [`indexByKey`](./index-by-key.md)
- [`matchByKey`](./match-by-key.md)
