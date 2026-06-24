# `mapKeys`

Maps an object's own enumerable string keys to new string keys while preserving each value. When multiple source keys map to the same target key, the later assignment wins.

## Signature

```ts
function mapKeys<T extends object, R extends string>(
	object: T,
	mapper: (key: StringKeyOf<T>, value: T[StringKeyOf<T>], object: T) => R,
): MappedKeys<T, R>;
```

## Example

```ts
import { mapKeys } from "umsizi";

const user = { id: "1", active: true } as const;

mapKeys(user, (key) => `user_${key}`);
// { user_id: "1", user_active: true }
```

## Related

- [`mapValues`](./map-values.md)
- [`renameKeys`](./rename-keys.md)
