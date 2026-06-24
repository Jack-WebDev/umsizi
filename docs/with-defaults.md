# `withDefaults`

Creates a reusable function that applies the provided defaults via `mergeDefaults()`. Handy when the same defaults are applied to many objects (e.g. normalizing a batch of records).

## Signature

```ts
function withDefaults<D extends object>(
	defaultValues: D,
): <T extends object>(object: T) => MergeDefaulted<T, D>;
```

## Example

```ts
import { withDefaults } from "umsizi";

const withUserDefaults = withDefaults({ role: "member", active: true });

withUserDefaults({ id: "1", role: "admin" });
// { id: "1", role: "admin", active: true }
```

## Related

- [`mergeDefaults`](./merge-defaults.md)
- [`defaults`](./defaults.md)
