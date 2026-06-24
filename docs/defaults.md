# `defaults`

Creates a new object by filling missing or `undefined` properties from a defaults object, one level deep. `null`, `false`, `0`, and other defined values — including nested objects — are kept exactly as-is; `defaults()` never looks inside an existing nested object.

This is intentionally different from `mergeDefaults()`: use `defaults()` when an existing nested object should be treated as a complete, atomic value (replace-or-keep), and `mergeDefaults()` when it should be merged key-by-key with its corresponding default.

## Signature

```ts
function defaults<T extends object, D extends object>(
	object: T,
	defaultValues: D,
): Defaulted<T, D>;
```

## Example

```ts
import { defaults } from "umsizi";

defaults({ name: "Jack", theme: undefined }, { theme: "dark", role: "admin" });
// { name: "Jack", theme: "dark", role: "admin" }
```

## Related

- [`mergeDefaults`](./merge-defaults.md)
- [`withDefaults`](./with-defaults.md)
