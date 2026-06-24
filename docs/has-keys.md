# `hasKeys`

Checks whether a plain object has all of the requested own keys, narrowing the matched properties to required on success. Rejects `null`, non-objects, non-plain objects, arrays, and class instances. Prefer the rest-key form for the strongest autocomplete and inference.

## Signature

```ts
function hasKeys<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): value is T & Required<Pick<T, FirstKey | RestKeys[number]>>;
function hasKeys<T extends object>(
	value: T,
	keys: readonly (keyof T)[],
): value is T;
```

## Example

```ts
import { hasKeys } from "umsizi";

const user = { id: "1", role: "admin" } as const;

if (hasKeys(user, "id", "role")) {
	user.id;
	user.role;
}
```

## Related

- [`requireKeys`](./require-keys.md)
- [`assertKeys`](./assert-keys.md)
