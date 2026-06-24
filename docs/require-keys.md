# `requireKeys`

Requires that a plain object has all of the requested own keys, returning the (narrowed) object on success. Throws a `TypeError` listing every missing key (singular/plural "key"/"keys" label included) when the check fails.

## Signature

```ts
function requireKeys<
	T extends object,
	const FirstKey extends keyof T,
	const RestKeys extends readonly (keyof T)[],
>(
	value: T,
	firstKey: FirstKey,
	...restKeys: RestKeys
): T & Required<Pick<T, FirstKey | RestKeys[number]>>;
function requireKeys<T extends object>(
	value: T,
	keys: readonly (keyof T)[],
): T;
```

## Example

```ts
import { requireKeys } from "umsizi";

const user = { id: "1", role: "admin" } as const;
const ensured = requireKeys(user, "id", "role");
```

## Related

- [`hasKeys`](./has-keys.md)
- [`assertKeys`](./assert-keys.md)
