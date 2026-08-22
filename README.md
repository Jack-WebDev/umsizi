<div align="center">

# UMSIZI

### *The missing TypeScript standard library.*

<p>
  <img src="https://img.shields.io/npm/v/umsizi.svg?style=for-the-badge&color=6366F1&labelColor=1a1a2e&label=npm" alt="npm version" />
  <img src="https://github.com/Jack-WebDev/umsizi/actions/workflows/ci.yml/badge.svg" alt="CI" />
  <img src="https://img.shields.io/badge/license-MIT-F59E0B?style=for-the-badge&labelColor=1a1a2e" alt="License: MIT" />
</p>

<p>
  <img src="https://img.shields.io/badge/dependencies-zero-22C55E?style=flat-square" alt="Zero dependencies" />
  <img src="https://img.shields.io/badge/ESM-only-3B82F6?style=flat-square" alt="ESM only" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node 20+" />
  <img src="https://img.shields.io/badge/TypeScript-first-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript first" />
</p>

**Umsizi** *(pronounced oom-see-zee)* is a modern, zero-dependency utility library built from the ground up for TypeScript applications.

<sub>The name comes from the Zulu word for <b>"helper"</b> or <b>"assistant"</b> — exactly what this library is designed to be.</sub>

<br>

[**⚡ Why Umsizi**](#-why-umsizi) •
[**📦 Installation**](#-installation) •
[**🧭 API Reference**](#-api-reference) •
[**🧩 Compatibility**](#-compatibility) •
[**⚖️ Comparisons**](#️-how-umsizi-compares) •
[**🤝 Contributing**](#-contributing)

</div>

<br>

It provides small, focused utilities that **preserve types**, **eliminate repetitive code**, and replace the disorganized `utils/` folder every project eventually creates.

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

<br>

## ⚡ Why Umsizi

Most TypeScript projects slowly accumulate a standard set of custom helpers:

```ts
src/
 └─ utils/
     ├─ arrays.ts
     ├─ objects.ts
     ├─ promises.ts
     └─ guards.ts
```

These copy-pasted snippets usually become **undocumented**, **inconsistently typed**, and **completely untested**.

> [!TIP]
> Umsizi replaces that folder with a single, production-ready, and highly optimized package.

### 🧭 Core Principles

<table>
<tr>
<td width="50%" valign="top">

**🎯 TypeScript-First**
Built around strict type inference. Types flow naturally through every utility so you never have to manually cast with `as`.

**🧩 Composition Over Configuration**
Every function does exactly one thing cleanly, favoring simple composition over complex, bloated configuration objects.

</td>
<td width="50%" valign="top">

**📦 Zero Dependencies**
No runtime dependencies means smaller installs, fewer security vulnerabilities, and predictable behavior.

**🌳 Tree-Shakable**
Only ship what you use. Unused utilities will never affect your production bundle size.

**🔒 Immutable by Default**
Utilities avoid mutating your existing data structures.

</td>
</tr>
</table>

<br>

## 📦 Installation

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

<br>

## 🗂️ Package Structure

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

| Entry point | Scope |
|---|---|
| `umsizi` | 🧠 Framework-agnostic core utilities |
| `umsizi/react` | ⚛️ React-oriented helpers |
| `umsizi/next` | ▲ Next.js-oriented helpers |
| `umsizi/node` | 🟢 Node-oriented helpers |

<br>

## 🧭 API Reference

> [!NOTE]
> Full signatures, edge cases, and runnable examples for every utility live in [`docs/`](./docs/README.md) — this section is a quick-reference index.

<details open>
<summary><b>🔑 Key/Value Iteration</b></summary>
<br>

[`identity`](./docs/identity.md) returns a value unchanged · [`typedKeys`](./docs/typed-keys.md) typed `Object.keys()` · [`typedEntries`](./docs/typed-entries.md) typed `Object.entries()` · [`typedFromEntries`](./docs/typed-from-entries.md) typed `Object.fromEntries()` · [`mapValues`](./docs/map-values.md) maps values, keeps keys · [`mapKeys`](./docs/map-keys.md) maps keys, keeps values

</details>

<details>
<summary><b>🔍 Selection & Filtering</b></summary>
<br>

[`pick`](./docs/pick.md) keeps selected keys · [`omit`](./docs/omit.md) drops selected keys · [`filterValues`](./docs/filter-values.md) filters by value · [`filterKeys`](./docs/filter-keys.md) filters by key · [`partitionObject`](./docs/partition-object.md) splits into matching/non-matching · [`renameKeys`](./docs/rename-keys.md) renames selected keys · [`invertObject`](./docs/invert-object.md) swaps keys and values · [`compactObject`](./docs/compact-object.md) drops `null`/`undefined` values

</details>

<details>
<summary><b>✅ Type Checking</b></summary>
<br>

[`isPlainObject`](./docs/is-plain-object.md) guards plain objects · [`isEmpty`](./docs/is-empty.md) checks for no own properties · [`hasOwn`](./docs/has-own.md) typed `Object.hasOwn()` · [`hasKeys`](./docs/has-keys.md) checks required keys exist · [`requireKeys`](./docs/require-keys.md) returns object or throws · [`assertKeys`](./docs/assert-keys.md) asserts required keys exist

</details>

<details>
<summary><b>🧵 Nested Paths</b></summary>
<br>

[`path`](./docs/path.md) parses dot/bracket notation · [`get`](./docs/get.md) reads a nested value · [`set`](./docs/set.md) immutably writes a nested value · [`hasPath`](./docs/has-path.md) checks a nested path exists · [`flattenObject`](./docs/flatten-object.md) flattens to path-notation keys · [`unflattenObject`](./docs/unflatten-object.md) reverses `flattenObject()`

</details>

<details>
<summary><b>🧬 Defaults & Merging</b></summary>
<br>

[`defaults`](./docs/defaults.md) fills missing values, one level deep · [`mergeDefaults`](./docs/merge-defaults.md) recursively fills missing values · [`withDefaults`](./docs/with-defaults.md) curries `mergeDefaults()` · [`deepMerge`](./docs/deep-merge.md) recursively merges with the source winning

</details>

<details>
<summary><b>🌊 Deep Operations</b></summary>
<br>

[`deepClone`](./docs/deep-clone.md) recursively clones objects/arrays · [`deepEqual`](./docs/deep-equal.md) structural equality check · [`diffObject`](./docs/diff-object.md) computes added/removed/changed keys

</details>

<details>
<summary><b>🛡️ Schema Validation</b></summary>
<br>

[`validateObject`](./docs/validate-object.md) validates against field validators · [`parseObject`](./docs/parse-object.md) validates or throws

</details>

<details>
<summary><b>📚 Collections</b></summary>
<br>

[`groupByKey`](./docs/group-by-key.md) groups array items by key · [`indexByKey`](./docs/index-by-key.md) indexes array items by key · [`matchByKey`](./docs/match-by-key.md) matches items across two arrays by key

</details>

<br>

### ⚛️ React Utilities (`umsizi/react`)

#### `isRenderFunction`

Small guard for values that should be callable in render-oriented code paths.

```ts
import { isRenderFunction } from "umsizi/react";

const value: unknown = () => "ready";

if (isRenderFunction(value)) {
	value();
}
```

### ▲ Next.js Utilities (`umsizi/next`)

#### `normalizePathname`

Normalizes path-like strings by ensuring a leading slash, collapsing duplicate slashes, and preserving root.

```ts
import { normalizePathname } from "umsizi/next";

normalizePathname("dashboard");
// "/dashboard"

normalizePathname("//dashboard///settings");
// "/dashboard/settings"
```

### 🟢 Node.js Utilities (`umsizi/node`)

#### `hasFileExtension`

Checks whether a file path ends with a specific extension.

```ts
import { hasFileExtension } from "umsizi/node";

hasFileExtension("src/index.ts", ".ts");
// true

hasFileExtension("package.json", "json");
// true
```

<br>

## 🧩 Compatibility

| | |
|---|---|
| **📦 ESM-only** | Umsizi ships only as ECMAScript modules (no CommonJS build). `require("umsizi")` will not work; use `import`. If your project is on CommonJS, you'll need a dynamic `import()` or a bundler that handles ESM dependencies. |
| **🟢 Node.js 20+** | Enforced via `engines.node` in `package.json`. |
| **🌐 Browsers** | The code targets ES2022 and has no Node-specific APIs in `umsizi` (core), `umsizi/react`, and `umsizi/next`; `umsizi/node` is Node-only by design. Bundle through your usual toolchain (Vite, Webpack, etc.) — there's no separate browser build. |

<br>

## ⚠️ Error Handling Philosophy

Umsizi utilities **trust their inputs** to match their TypeScript signatures. They do not perform runtime validation, and they do not throw — invalid input (e.g. calling a Node-typed function with a non-string) produces an unspecified but non-throwing result rather than an exception.

> [!IMPORTANT]
> If you're handling untrusted input (user input, network responses, `unknown`/`any` values), validate or narrow it *before* passing it into Umsizi. This keeps the utilities small, predictable, and fast, matching their role as thin building blocks rather than a validation layer.

<br>

## 📖 Examples

See [`examples/`](./examples) for runnable, slightly more realistic usage of each utility beyond the snippets above.

<br>

## 📊 Current Status

> [!NOTE]
> Umsizi is still in **early development**. The package structure is in place, the initial utilities are implemented, and the public API is intentionally small.

New helpers should only be added when they meet the project standards for:

- ✅ type safety
- ✅ runtime correctness
- ✅ API clarity
- ✅ zero-dependency design

<br>

## ⚖️ How Umsizi Compares

| Library | Umsizi's take |
|---|---|
| **vs Lodash** | Lodash was built for an era before modern JavaScript and TypeScript existed. Umsizi embraces modern JS features and prioritizes zero-overhead type inference. |
| **vs Radash** | While Radash is excellent, Umsizi hones in purely on application development patterns and strict, seamless type inference. |
| **vs Remeda** | Remeda heavily emphasizes functional programming paradigms like data-last currying. Umsizi targets straightforward, standard-library-style code for everyday projects. |

<br>

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

If you want to introduce a helper, ensure it meets the baseline:

1. ✅ It solves a highly recurring, real-world application problem.
2. ✅ It features bulletproof TypeScript type safety.
3. ✅ It includes comprehensive runtime and type-level tests.
4. ✅ It remains entirely dependency-free.

<br>

## 🔐 Security

See [SECURITY.md](./SECURITY.md) for the vulnerability reporting policy.

<br>

## 📄 License

<div align="center">

**MIT**

<sub>🛠️ Umsizi — the helper your `utils/` folder wishes it was.</sub>

</div>