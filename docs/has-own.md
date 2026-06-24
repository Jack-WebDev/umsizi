# `hasOwn`

A typed wrapper around `Object.hasOwn()` that narrows the provided key when the check succeeds.

## Signature

```ts
function hasOwn<T extends object, K extends PropertyKey>(
	object: T,
	key: K,
): key is Extract<K, keyof T>;
```

## Example

```ts
import { hasOwn } from "umsizi";

const user = { id: "1" };
const key: string = "id";

if (hasOwn(user, key)) {
	user[key]; // key is narrowed to "id"
}
```

## Related

- [`hasKeys`](./has-keys.md)
- [`hasPath`](./has-path.md)
