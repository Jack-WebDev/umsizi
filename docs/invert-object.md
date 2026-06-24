# `invertObject`

Inverts an object's own enumerable string-keyed properties, swapping keys and values. Source values must be valid property keys. When multiple source keys share the same value, the later assignment wins.

## Signature

```ts
function invertObject<T extends Record<string, PropertyKey>>(
	object: T,
): InvertedObject<T>;
```

## Example

```ts
import { invertObject } from "umsizi";

const roles = { admin: "A", member: "M" } as const;

invertObject(roles);
// { A: "admin", M: "member" }
```

## Related

- [`renameKeys`](./rename-keys.md)
