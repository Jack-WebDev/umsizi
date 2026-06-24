# `typedKeys`

Returns the own enumerable string keys of an object with preserved key types. A typed wrapper around `Object.keys()`. Symbol and numeric keys are excluded from the result type.

## Signature

```ts
function typedKeys<T extends object>(object: T): Array<StringKeyOf<T>>;
```

## Example

```ts
import { typedKeys } from "umsizi";

const user = { id: "1", name: "Jack" } as const;

typedKeys(user);
// ["id", "name"]
```

## Related

- [`typedEntries`](./typed-entries.md)
- [`typedFromEntries`](./typed-from-entries.md)
