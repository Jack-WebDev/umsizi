# `indexByKey`

Indexes items by a property whose value can be used as an object key. Later items overwrite earlier items with the same key. The result type is `Partial`, since any particular key may have no matching item.

## Signature

```ts
function indexByKey<T extends object, K extends keyof T>(
	items: ReadonlyArray<T>,
	key: K,
): IndexedByKey<T, K>;
```

## Example

```ts
import { indexByKey } from "umsizi";

indexByKey(
	[
		{ id: "1", name: "Ada" },
		{ id: "2", name: "Linus" },
	],
	"id",
);
// { "1": { id: "1", name: "Ada" }, "2": { id: "2", name: "Linus" } }
```

## Related

- [`groupByKey`](./group-by-key.md)
- [`matchByKey`](./match-by-key.md)
