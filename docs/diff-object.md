# `diffObject`

Computes the own-key differences between two objects. `added` holds keys present in `after` but not `before`, `removed` holds keys present in `before` but not `after`, and `changed` holds keys present in both whose values differ per `deepEqual()` — so structurally-equal nested values are not flagged as changed even if their references differ. Useful for dirty-checking and constructing PATCH payloads.

## Signature

```ts
function diffObject<T extends object, U extends object>(
	before: T,
	after: U,
): ObjectDiff<T, U>;
```

## Example

```ts
import { diffObject } from "umsizi";

diffObject(
	{ id: "1", name: "Ada", role: "admin" },
	{ id: "1", name: "Ada Lovelace" },
);
// { added: {}, removed: { role: "admin" }, changed: { name: "Ada Lovelace" } }
```

## Related

- [`deepEqual`](./deep-equal.md)
- [`compactObject`](./compact-object.md)
- [`partitionObject`](./partition-object.md)
