# `parseObject`

Parses an unknown value as a typed object by validating it against a schema, throwing a `TypeError` ("Invalid object.") when validation fails. A throwing counterpart to `validateObject()` for call sites that want to fail fast rather than branch on a boolean.

## Signature

```ts
function parseObject<const T extends ObjectSchema>(
	value: unknown,
	definition: T,
): InferSchema<T>;
```

## Example

```ts
import { parseObject } from "umsizi";

const user = parseObject(payload, {
	id: (value): value is string => typeof value === "string",
	active: (value): value is boolean => typeof value === "boolean",
});
```

## Related

- [`validateObject`](./validate-object.md)
