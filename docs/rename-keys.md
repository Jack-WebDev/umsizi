# `renameKeys`

Renames selected own enumerable string-keyed properties using a key map. Unmapped keys are copied through unchanged. When multiple source keys resolve to the same target key, the later assignment wins.

## Signature

```ts
function renameKeys<
	T extends object,
	const M extends Partial<Record<StringKeyOf<T>, string>>,
>(object: T, names: M): RenamedKeys<T, M>;
```

## Example

```ts
import { renameKeys } from "umsizi";

const user = { id: "1", givenName: "Jack" } as const;

renameKeys(user, { givenName: "name" });
// { id: "1", name: "Jack" }
```

## Related

- [`mapKeys`](./map-keys.md)
- [`pick`](./pick.md)
