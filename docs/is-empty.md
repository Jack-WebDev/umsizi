# `isEmpty`

Returns `true` when an object has no own enumerable properties. Both string keys and symbol keys are considered; non-enumerable properties are ignored.

## Signature

```ts
function isEmpty(object: object): boolean;
```

## Example

```ts
import { isEmpty } from "umsizi";

isEmpty({}); // true
isEmpty({ id: "1" }); // false
```

## Related

- [`isPlainObject`](./is-plain-object.md)
- [`compactObject`](./compact-object.md)
