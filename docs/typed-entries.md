# `typedEntries`

Returns the own enumerable string-keyed entries of an object with preserved key/value pairing. A typed wrapper around `Object.entries()`.

## Signature

```ts
function typedEntries<T extends object>(object: T): ObjectEntries<T>;
```

## Example

```ts
import { typedEntries } from "umsizi";

const user = { id: "1", active: true } as const;

typedEntries(user);
// [["id", "1"], ["active", true]]
```

## Related

- [`typedKeys`](./typed-keys.md)
- [`typedFromEntries`](./typed-from-entries.md)
