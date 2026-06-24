# `isPlainObject`

Checks whether a value is a plain object with a prototype of `Object.prototype` or `null`. Arrays, functions, boxed primitives, dates, maps, sets, and class instances all return `false`.

## Signature

```ts
function isPlainObject(
	value: unknown,
): value is Record<PropertyKey, unknown>;
```

## Example

```ts
import { isPlainObject } from "umsizi";

const payload: unknown = { id: "1" };

if (isPlainObject(payload)) {
	payload.id;
}
```

## Related

- [`isEmpty`](./is-empty.md)
- [`validateObject`](./validate-object.md)
