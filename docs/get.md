# `get`

Reads a nested own property using a tuple path or dot/bracket notation. Returns `undefined` (or a provided default) if any segment along the path is missing; an existing property whose value happens to be `undefined` is still treated as present, distinct from a missing path.

## Signature

```ts
function get<T, const P extends ObjectPath>(
	object: T,
	path: P,
): PathValue<T, P> | undefined;
function get<T, const P extends ObjectPath, D>(
	object: T,
	path: P,
	defaultValue: D,
): Exclude<PathValue<T, P>, undefined> | D;
function get<T>(object: T, path: string): unknown;
```

## Example

```ts
import { get } from "umsizi";

get(
	{ profile: { addresses: [{ city: "Durban" }] } },
	"profile.addresses[0].city",
);
// "Durban"
```

## Related

- [`set`](./set.md)
- [`hasPath`](./has-path.md)
- [`path`](./path.md)
