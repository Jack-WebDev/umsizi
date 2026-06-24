# `mergeDefaults`

Recursively fills missing or `undefined` properties from a defaults object. Only plain objects are merged deeply when both sides are plain objects at the same key — arrays and other non-plain values (`Date`, class instances, etc.) are treated as leaf values and never merged. Does not guard against circular references.

This is intentionally different from `defaults()`: use `mergeDefaults()` when a nested object should be merged key-by-key with its corresponding default, and `defaults()` when an existing nested object should be treated as a complete, atomic value.

## Signature

```ts
function mergeDefaults<T extends object, D extends object>(
	object: T,
	defaultValues: D,
): MergeDefaulted<T, D>;
```

## Example

```ts
import { mergeDefaults } from "umsizi";

mergeDefaults(
	{ profile: { name: "Jack", settings: { theme: undefined } } },
	{ profile: { settings: { theme: "light", compact: true } } },
);
// { profile: { name: "Jack", settings: { theme: "light", compact: true } } }
```

## Related

- [`defaults`](./defaults.md)
- [`withDefaults`](./with-defaults.md)
- [`deepMerge`](./deep-merge.md)
