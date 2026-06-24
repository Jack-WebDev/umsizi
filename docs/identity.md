# `identity`

Returns the given value unchanged. Useful as a default callback, a type-inference anchor, or a no-op placeholder where a transform function is expected.

## Signature

```ts
function identity<T>(value: T): T;
```

## Example

```ts
import { identity } from "umsizi";

identity("umsizi"); // "umsizi"
```

## Related

- [`typedKeys`](./typed-keys.md)
