# `path`

Converts dot/bracket notation into a normalized object path array. Bare bracket content (`[0]`) is parsed as a number segment; quoted bracket content (`['feature.flag']`) is kept as a string segment, which lets you address keys containing dots or brackets. Note that an all-digit segment is always coerced to a number by the underlying parser, even when it came from a quoted bracket — so a plain-object key that looks like an array index (e.g. `"0"`) cannot be distinguished from an array index through this notation.

## Signature

```ts
function path(input: string | ObjectPath): ObjectPath;
```

## Example

```ts
import { path } from "umsizi";

path("profile.addresses[0].city");
// ["profile", "addresses", 0, "city"]

path("settings['feature.flag'].enabled");
// ["settings", "feature.flag", "enabled"]
```

## Related

- [`get`](./get.md)
- [`set`](./set.md)
- [`hasPath`](./has-path.md)
- [`flattenObject`](./flatten-object.md)
