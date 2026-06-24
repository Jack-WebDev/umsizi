# `typedFromEntries`

Creates an object from entries while preserving the key and value types from the input tuple array. A typed wrapper around `Object.fromEntries()`.

## Signature

```ts
function typedFromEntries<const T extends EntryTuples>(
	entries: T,
): ObjectFromEntries<T>;
```

## Example

```ts
import { typedFromEntries } from "umsizi";

const user = typedFromEntries([
	["id", "1"],
	["active", true],
] as const);
// inferred as: { id: "1"; active: true }
```

## Related

- [`typedKeys`](./typed-keys.md)
- [`typedEntries`](./typed-entries.md)
