# `mapValues`

Maps the values of an object's own enumerable string-keyed properties while preserving the original key set.

## Signature

```ts
function mapValues<T extends object, R>(
	object: T,
	mapper: (value: T[StringKeyOf<T>], key: StringKeyOf<T>, object: T) => R,
): MappedValues<T, R>;
```

## Example

```ts
import { mapValues } from "umsizi";

mapValues({ draft: 1, published: 2 }, (value) => value * 2);
// { draft: 2, published: 4 }
```

## Related

- [`mapKeys`](./map-keys.md)
- [`filterValues`](./filter-values.md)
