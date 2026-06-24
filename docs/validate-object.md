# `validateObject`

Validates an unknown value against a schema of field validators (a plain object mapping each expected key to a type-guard function). All schema keys must exist as own properties on the input object and every field validator must accept its corresponding value. Extra properties on the input are ignored. Note that `validateObject()` trusts the validators it's given — it does not verify that a "validator" is actually a type guard rather than some other function.

## Signature

```ts
function validateObject<const T extends ObjectSchema>(
	value: unknown,
	definition: T,
): value is InferSchema<T>;
```

## Example

```ts
import { validateObject } from "umsizi";

const isUser = validateObject(
	{ id: "usr_1", active: true },
	{
		id: (value): value is string => typeof value === "string",
		active: (value): value is boolean => typeof value === "boolean",
	},
);
```

## Related

- [`parseObject`](./parse-object.md)
- [`isPlainObject`](./is-plain-object.md)
