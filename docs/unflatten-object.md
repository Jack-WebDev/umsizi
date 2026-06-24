# `unflattenObject`

Reconstructs a nested object from a flat object whose keys use dot/bracket notation — the inverse of `flattenObject()`. Implemented as a fold over `set()`, so it shares `set()`'s container-creation rules.

## Signature

```ts
function unflattenObject(
	flat: Record<string, unknown>,
): Record<string, unknown>;
```

## Example

```ts
import { unflattenObject } from "umsizi";

unflattenObject({ "profile.addresses[0].city": "Durban" });
// { profile: { addresses: [{ city: "Durban" }] } }
```

## Related

- [`flattenObject`](./flatten-object.md)
- [`set`](./set.md)
