# `filterValues`

Filters an object's own enumerable string-keyed properties by value. Supports both boolean predicates and type-guard predicates; the result type is partial because any property may be removed at runtime.

## Signature

```ts
function filterValues<T extends object, S extends T[StringKeyOf<T>]>(
	object: T,
	predicate: ValueGuard<T, S>,
): FilteredValues<T, S>;
function filterValues<T extends object>(
	object: T,
	predicate: ValuePredicate<T>,
): FilteredValues<T, T[StringKeyOf<T>]>;
```

## Example

```ts
import { filterValues } from "umsizi";

filterValues({ a: 1, b: 0, c: null }, (value) => value !== null);
// { a: 1, b: 0 }
```

## Related

- [`filterKeys`](./filter-keys.md)
- [`partitionObject`](./partition-object.md)
