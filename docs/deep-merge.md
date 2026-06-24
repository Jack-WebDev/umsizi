# `deepMerge`

Recursively merges a source object into a target object, with the source's defined values always taking precedence. Unlike `mergeDefaults()`, which only fills missing or `undefined` properties, `deepMerge()` overwrites every key present in `source` — recursing only when both sides are plain objects at that key. Arrays and other non-plain values in `source` replace the target's value wholesale. Does not guard against circular references.

## Signature

```ts
function deepMerge<T extends object, S extends object>(
	target: T,
	source: S,
): DeepMerged<T, S>;
```

## Example

```ts
import { deepMerge } from "umsizi";

deepMerge(
	{ profile: { name: "Ada", theme: "dark" }, tags: ["admin"] },
	{ profile: { theme: "light" }, tags: ["member"] },
);
// { profile: { name: "Ada", theme: "light" }, tags: ["member"] }
```

## Related

- [`mergeDefaults`](./merge-defaults.md)
- [`deepClone`](./deep-clone.md)
