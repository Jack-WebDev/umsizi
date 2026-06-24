# `omit`

Creates a new object excluding the selected own enumerable properties. Inherited properties are excluded from the result automatically (they were never copied), and symbol keys are handled correctly via `Reflect.ownKeys()`.

Prefer the rest-key form for the strongest autocomplete and inference.

## Signature

```ts
function omit<T extends object, const Keys extends readonly (keyof T)[]>(
	object: T,
	...keys: Keys
): Omit<T, Keys[number]>;
function omit<T extends object>(
	object: T,
	keys: readonly (keyof T)[],
): Partial<T>;
```

## Example

```ts
import { omit } from "umsizi";

const user = { id: "1", name: "Jack", role: "admin" } as const;

omit(user, "role");
// { id: "1", name: "Jack" }

omit(user, ["createdAt"] as const); // exact-key array form
```

## Related

- [`pick`](./pick.md)
