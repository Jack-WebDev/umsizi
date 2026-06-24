# `set`

Returns a new object with the nested path set to the given value. Missing containers along the path are created automatically (arrays for numeric segments, objects otherwise). Only the modified path is cloned — untouched branches keep their existing references. Passing an empty path returns the original object unchanged.

## Signature

```ts
function set<T extends object>(
	object: T,
	pathInput: PathInput,
	value: unknown,
): T;
```

## Example

```ts
import { set } from "umsizi";

set({}, "profile.addresses[0].city", "Durban");
// { profile: { addresses: [{ city: "Durban" }] } }
```

## Related

- [`get`](./get.md)
- [`hasPath`](./has-path.md)
- [`unflattenObject`](./unflatten-object.md)
