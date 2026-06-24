# `deepClone`

Recursively clones arrays and plain objects (including symbol-keyed properties). `Date` values are cloned by timestamp since they're mutable. Every other object-like value — Maps, Sets, `RegExp`, functions, class instances — is returned by reference, the same "non-plain objects are leaves" stance `mergeDefaults()` takes. Does not guard against circular references.

## Signature

```ts
function deepClone<T>(value: T): T;
```

## Example

```ts
import { deepClone } from "umsizi";

const original = { profile: { tags: ["admin"] } };
const clone = deepClone(original);

clone.profile.tags.push("member");
original.profile.tags; // ["admin"]
```

## Related

- [`deepEqual`](./deep-equal.md)
- [`deepMerge`](./deep-merge.md)
