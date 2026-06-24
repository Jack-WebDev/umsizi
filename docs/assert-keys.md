# `assertKeys`

Asserts that a plain object has all of the requested own keys. A thin assertion-function wrapper around `requireKeys()` for call sites that want narrowing on an existing binding rather than a new return value.

## Signature

```ts
function assertKeys<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): asserts value is T & Required<Pick<T, FirstKey | RestKeys[number]>>;
```

## Example

```ts
import { assertKeys } from "umsizi";

const user: { id?: string; role?: string } = { id: "1", role: "admin" };

assertKeys(user, "id", "role");

user.id;
user.role;
```

## Related

- [`requireKeys`](./require-keys.md)
- [`hasKeys`](./has-keys.md)
