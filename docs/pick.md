# `pick`

Creates a new object containing only the selected own properties. Missing keys are silently ignored; inherited properties are never picked.

Prefer the rest-key form for the strongest autocomplete and inference. If you pass an array literal and want exact key inference, use `as const`.

## Signature

```ts
function pick<T extends object, const Keys extends readonly (keyof T)[]>(
	object: T,
	...keys: Keys
): Pick<T, Keys[number]>;
function pick<T extends object>(
	object: T,
	keys: readonly (keyof T)[],
): Partial<T>;
```

## Example

```ts
import { pick } from "umsizi";

const user = { id: "1", name: "Jack", role: "admin" } as const;

pick(user, "id", "role");
// { id: "1", role: "admin" }

pick(user, ["id", "role"] as const); // same result, exact-key form
```

## Related

- [`omit`](./omit.md)
