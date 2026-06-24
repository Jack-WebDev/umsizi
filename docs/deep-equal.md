# `deepEqual`

Checks whether two values are structurally equal. Plain objects are compared by own key set and recursive value equality; arrays by length and recursive, index-wise equality; `Date` values by timestamp. Primitives are compared with `Object.is()`, so `NaN` equals `NaN` and `-0`/`+0` are distinguished. Everything else (Maps, Sets, `RegExp`, functions, class instances) falls back to `Object.is()` — compared by reference rather than structurally, intentionally out of scope rather than half-supported.

## Signature

```ts
function deepEqual(a: unknown, b: unknown): boolean;
```

## Example

```ts
import { deepEqual } from "umsizi";

deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }); // true
deepEqual(new Map(), new Map()); // false (compared by reference)
```

## Related

- [`deepClone`](./deep-clone.md)
- [`diffObject`](./diff-object.md)
