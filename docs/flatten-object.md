# `flattenObject`

Flattens a nested plain object into a single-level object whose keys use the same dot/bracket notation `path()` parses, so a flattened key round-trips through `path()`/`get()`/`set()`.

Empty nested objects and arrays are kept as leaf values rather than dropped. Plain-object keys that look like array indices (e.g. `"0"`) are not distinguished from array indices by `path()`'s grammar, so round-tripping such a key through `unflattenObject()` produces an array instead of the original object — an existing limitation of `path()`'s segment model, not specific to this utility.

## Signature

```ts
function flattenObject<T extends object>(object: T): Record<string, unknown>;
```

## Example

```ts
import { flattenObject } from "umsizi";

flattenObject({ profile: { addresses: [{ city: "Durban" }] } });
// { "profile.addresses[0].city": "Durban" }
```

## Related

- [`unflattenObject`](./unflatten-object.md)
- [`path`](./path.md)
