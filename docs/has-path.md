# `hasPath`

Checks whether a nested own-property path exists. A resolved `undefined` value still counts as existing as long as every segment is present as an own property.

## Signature

```ts
function hasPath(object: unknown, pathInput: PathInput): boolean;
```

## Example

```ts
import { hasPath } from "umsizi";

hasPath({ profile: { nickname: undefined } }, ["profile", "nickname"]);
// true
```

## Related

- [`get`](./get.md)
- [`set`](./set.md)
