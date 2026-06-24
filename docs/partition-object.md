# `partitionObject`

Partitions an object's own enumerable string-keyed properties into matching and non-matching objects. Supports both boolean predicates and type-guard predicates.

## Signature

```ts
function partitionObject<T extends object, S extends T[StringKeyOf<T>]>(
	object: T,
	predicate: ValueGuard<T, S>,
): PartitionedValues<T, S>;
function partitionObject<T extends object>(
	object: T,
	predicate: ValuePredicate<T>,
): PartitionedObject<T>;
```

## Example

```ts
import { partitionObject } from "umsizi";

const settings = { retries: 3, label: "ok", timeout: null } as const;

partitionObject(settings, (value) => value !== null);
// [{ retries: 3, label: "ok" }, { timeout: null }]
```

## Related

- [`filterValues`](./filter-values.md)
- [`diffObject`](./diff-object.md)
