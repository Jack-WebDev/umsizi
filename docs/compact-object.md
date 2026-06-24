# `compactObject`

Creates a new object with all `null` and `undefined` values removed. Other falsy values such as `0`, `false`, `""`, and `NaN` are preserved.

## Signature

```ts
function compactObject<T extends object>(object: T): CompactedObject<T>;
```

## Example

```ts
import { compactObject } from "umsizi";

compactObject({ id: "1", nickname: null, active: false });
// { id: "1", active: false }
```

## Related

- [`filterValues`](./filter-values.md)
- [`diffObject`](./diff-object.md)
