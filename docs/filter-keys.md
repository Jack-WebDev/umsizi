# `filterKeys`

Filters an object's own enumerable string-keyed properties by key. Supports both boolean predicates and key type guards; the result remains partial because any property may be removed at runtime.

## Signature

```ts
function filterKeys<T extends object, S extends StringKeyOf<T>>(
	object: T,
	predicate: KeyGuard<T, S>,
): FilteredKeys<T, S>;
function filterKeys<T extends object>(
	object: T,
	predicate: KeyPredicate<T>,
): FilteredKeys<T, StringKeyOf<T>>;
```

## Example

```ts
import { filterKeys } from "umsizi";

const metrics = { total: 5, temp_cache: 2, temp_jobs: 1 } as const;

filterKeys(metrics, (key) => key.startsWith("temp_"));
// { temp_cache: 2, temp_jobs: 1 }
```

## Related

- [`filterValues`](./filter-values.md)
- [`partitionObject`](./partition-object.md)
