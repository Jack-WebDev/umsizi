# Examples

Runnable, slightly more realistic usage examples for each Umsizi entry point. The
README's API reference shows the bare function signatures; these show them in a
small bit of surrounding context.

Examples are included in the repository TypeScript project, so they also act as
editor and inference regression coverage during local typechecking.

Each example imports directly from `../../src` so it can be run against the
current checkout without building or publishing first:

```bash
pnpm dlx tsx examples/core/identity.example.ts
pnpm dlx tsx examples/core/object-utils.example.ts
pnpm dlx tsx examples/react/is-render-function.example.ts
pnpm dlx tsx examples/next/normalize-pathname.example.ts
pnpm dlx tsx examples/node/has-file-extension.example.ts
```

In a real project, replace the relative import with the published entry point, e.g.:

```ts
import { identity } from "umsizi";
import { isRenderFunction } from "umsizi/react";
import { normalizePathname } from "umsizi/next";
import { hasFileExtension } from "umsizi/node";
```
