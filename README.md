# Umsizi

[![npm version](https://img.shields.io/npm/v/umsizi.svg)](https://www.npmjs.com/package/umsizi)
[![CI](https://github.com/Jack-WebDev/umsizi/actions/workflows/ci.yml/badge.svg)](https://github.com/Jack-WebDev/umsizi/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> The missing TypeScript standard library.

**Umsizi** (pronounced *oom-see-zee*) is a modern, zero-dependency utility library built from the ground up for TypeScript applications. The name comes from the Zulu word for **"helper"** or **"assistant"**—which is exactly what this library is designed to be.

It provides small, focused utilities that preserve types, eliminate repetitive code, and replace the disorganized `utils/` folder every project eventually creates.

```ts
import { identity } from "umsizi";

const user = {
	id: "1",
	name: "Jack",
};

const result = identity(user);
// inferred as:
// {
//   id: string;
//   name: string;
// }
```

---

## Why Umsizi

Most TypeScript projects slowly accumulate a standard set of custom helpers:

```ts
src/
 └─ utils/
     ├─ arrays.ts
     ├─ objects.ts
     ├─ promises.ts
     └─ guards.ts

```

These copy-pasted snippets usually become undocumented, inconsistently typed, and completely untested. Umsizi replaces that folder with a single, production-ready, and highly optimized package.

### Core Principles

- **TypeScript-First:** Built around strict type inference. Types flow naturally through every utility so you never have to manually cast with `as`.
- **Composition Over Configuration:** Every function does exactly one thing cleanly, favoring simple composition over complex, bloated configuration objects.
- **Zero Dependencies:** No runtime dependencies means smaller installs, fewer security vulnerabilities, and predictable behavior.
- **Tree-Shakable:** Only ship what you use. Unused utilities will never affect your production bundle size.
- **Immutable by Default:** Utilities avoid mutating your existing data structures.

---

## Installation

Install via your package manager of choice:

```bash
# npm
npm install umsizi

# pnpm
pnpm add umsizi

# yarn
yarn add umsizi

# bun
bun add umsizi

```

---

## Package Structure

Umsizi is split into focused entry points:

```ts
import { identity } from "umsizi";
import { isRenderFunction } from "umsizi/react";
import { normalizePathname } from "umsizi/next";
import { hasFileExtension } from "umsizi/node";
```

Current structure:

```txt
src/
  core/
  react/
  next/
  node/
```

- `umsizi`: framework-agnostic core utilities
- `umsizi/react`: React-oriented helpers
- `umsizi/next`: Next.js-oriented helpers
- `umsizi/node`: Node-oriented helpers

---

## API Reference

### Core Utilities

#### `identity`

```ts
import { identity } from "umsizi";

const value = identity("umsizi");
// "umsizi"

```

#### `typedKeys`

```ts
import { typedKeys } from "umsizi";

const user = { id: "1", name: "Jack" } as const;

typedKeys(user);
// ["id", "name"]
```

#### `typedEntries`

```ts
import { typedEntries } from "umsizi";

const user = { id: "1", active: true } as const;

typedEntries(user);
// [["id", "1"], ["active", true]]
```

#### `typedFromEntries`

```ts
import { typedFromEntries } from "umsizi";

const user = typedFromEntries([
	["id", "1"],
	["active", true],
] as const);
```

#### `pick`

```ts
import { pick } from "umsizi";

pick({ id: "1", name: "Jack", role: "admin" }, "id", "role");
// { id: "1", role: "admin" }
```

#### `omit`

```ts
import { omit } from "umsizi";

omit({ id: "1", name: "Jack", role: "admin" }, "role");
// { id: "1", name: "Jack" }
```

For the best autocomplete, prefer the rest-key form for `pick()` and `omit()`.
If you pass an array literal and want exact key inference, use `as const`:

```ts
pick(user, ["id", "role"] as const);
omit(user, ["createdAt"] as const);
```

#### `isEmpty`

```ts
import { isEmpty } from "umsizi";

isEmpty({});
// true
```

#### `hasOwn`

```ts
import { hasOwn } from "umsizi";

const user = { id: "1" };
const key: string = "id";

if (hasOwn(user, key)) {
	user[key];
}
```

#### `isPlainObject`

```ts
import { isPlainObject } from "umsizi";

const payload: unknown = { id: "1" };

if (isPlainObject(payload)) {
	payload.id;
}
```

#### `isRecord`

```ts
import { isRecord } from "umsizi";

const payload: unknown = { id: "1" };

if (isRecord(payload)) {
	payload.id;
}
```

#### `hasKeys`

```ts
import { hasKeys } from "umsizi";

const user = { id: "1", role: "admin" } as const;

if (hasKeys(user, "id", "role")) {
	user.id;
	user.role;
}
```

#### `requireKeys`

```ts
import { requireKeys } from "umsizi";

const user = { id: "1", role: "admin" } as const;
const ensured = requireKeys(user, "id", "role");
```

#### `assertKeys`

```ts
import { assertKeys } from "umsizi";

const user: { id?: string; role?: string } = {
	id: "1",
	role: "admin",
};

assertKeys(user, "id", "role");

user.id;
user.role;
```

#### `mapValues`

```ts
import { mapValues } from "umsizi";

mapValues({ draft: 1, published: 2 }, (value) => value * 2);
// { draft: 2, published: 4 }
```

#### `filterValues`

```ts
import { filterValues } from "umsizi";

filterValues({ a: 1, b: 0, c: null }, (value) => value !== null);
// { a: 1, b: 0 }
```

#### `compactObject`

```ts
import { compactObject } from "umsizi";

compactObject({ id: "1", nickname: null, active: false });
// { id: "1", active: false }
```

### React Utilities (`umsizi/react`)

#### `isRenderFunction`

Small guard for values that should be callable in render-oriented code paths.

```ts
import { isRenderFunction } from "umsizi/react";

const value: unknown = () => "ready";

if (isRenderFunction(value)) {
	value();
}
```

### Next.js Utilities (`umsizi/next`)

#### `normalizePathname`

Normalizes path-like strings by ensuring a leading slash, collapsing duplicate slashes, and preserving root.

```ts
import { normalizePathname } from "umsizi/next";

normalizePathname("dashboard");
// "/dashboard"

normalizePathname("//dashboard///settings");
// "/dashboard/settings"
```

### Node.js Utilities (`umsizi/node`)

#### `hasFileExtension`

Checks whether a file path ends with a specific extension.

```ts
import { hasFileExtension } from "umsizi/node";

hasFileExtension("src/index.ts", ".ts");
// true

hasFileExtension("package.json", "json");
// true
```

---

## Compatibility

- **ESM-only.** Umsizi ships only as ECMAScript modules (no CommonJS build). `require("umsizi")` will not work; use `import`. If your project is on CommonJS, you'll need a dynamic `import()` or a bundler that handles ESM dependencies.
- **Node.js 20+.** Enforced via `engines.node` in `package.json`.
- **Browsers:** the code targets ES2022 and has no Node-specific APIs in `umsizi` (core), `umsizi/react`, and `umsizi/next`; `umsizi/node` is Node-only by design. Bundle through your usual toolchain (Vite, Webpack, etc.) — there's no separate browser build.

## Error Handling Philosophy

Umsizi utilities **trust their inputs** to match their TypeScript signatures. They do not perform runtime validation, and they do not throw — invalid input (e.g. calling a Node-typed function with a non-string) produces an unspecified but non-throwing result rather than an exception.

If you're handling untrusted input (user input, network responses, `unknown`/`any` values), validate or narrow it *before* passing it into Umsizi. This keeps the utilities small, predictable, and fast, matching their role as thin building blocks rather than a validation layer.

## Versioning & Stability

Umsizi follows [semantic versioning](https://semver.org/). While the package is `0.x`:

- Minor versions (`0.x.0`) may include breaking changes to the public API.
- Patch versions (`0.0.x`) are bug fixes only.
- Once the API stabilizes, `1.0.0` will commit to standard semver guarantees (breaking changes only on major versions).

Releases are managed via [Changesets](https://github.com/changesets/changesets) and npm trusted publishing from GitHub Actions; see the generated `CHANGELOG.md` for version history.

---

## Examples

See [`examples/`](./examples) for runnable, slightly more realistic usage of each utility beyond the snippets below.

---

## Current Status

Umsizi is still in early development. The package structure is in place, the initial utilities are implemented, and the public API is intentionally small.

New helpers should only be added when they meet the project standards for:

- type safety
- runtime correctness
- API clarity
- zero-dependency design

---

## How Umsizi Compares

- **vs Lodash:** Lodash was built for an era before modern JavaScript and TypeScript existed. Umsizi embraces modern JS features and prioritizes zero-overhead type inference.
- **vs Radash:** While Radash is excellent, Umsizi hones in purely on application development patterns and strict, seamless type inference.
- **vs Remeda:** Remeda heavily emphasizes functional programming paradigms like data-last currying. Umsizi targets straightforward, standard-library-style code for everyday projects.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

If you want to introduce a helper, ensure it meets the baseline:

1. It solves a highly recurring, real-world application problem.
2. It features bulletproof TypeScript type safety.
3. It includes comprehensive runtime and type-level tests.
4. It remains entirely dependency-free.

---

## Security

See [SECURITY.md](./SECURITY.md) for the vulnerability reporting policy.

---

## License

MIT
