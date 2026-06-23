# Umsizi

> The missing TypeScript standard library.

**Umsizi** (pronounced *oom-see-zee*) is a modern, zero-dependency utility library built from the ground up for TypeScript applications. The name comes from the Zulu word for **"helper"** or **"assistant"**—which is exactly what this library is designed to be.

It provides small, focused utilities that preserve types, eliminate repetitive code, and permanently replace the disorganized `utils/` folder every project eventually creates.

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

## Why Umsizi?

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

* **TypeScript-First:** Built around strict type inference. Types flow naturally through every utility so you never have to manually cast with `as`.
* **Composition Over Configuration:** Every function does exactly one thing cleanly, favoring simple composition over complex, bloated configuration objects.
* **Zero Dependencies:** No runtime dependencies means smaller installs, fewer security vulnerabilities, and predictable behavior.
* **Tree-Shakable:** Only ship what you use. Unused utilities will never affect your production bundle size.
* **Immutable by Default:** Utilities avoid mutating your existing data structures.

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

## API Reference

### Core Utilities

#### `identity`

```ts
import { identity } from "umsizi";

const value = identity("umsizi");
// "umsizi"

```

Current status: the library is in early development and the public API is intentionally small. Additional utilities will be added only when they meet the project standards for type safety, runtime correctness, and zero-dependency design.

---

## How Umsizi Compares

* **vs Lodash:** Lodash was built for an era before modern JavaScript and TypeScript existed. Umsizi embraces modern JS features and prioritizes zero-overhead type inference.
* **vs Radash:** While Radash is excellent, Umsizi hones in purely on application development patterns and strict, seamless type inference.
* **vs Remeda:** Remeda heavily emphasizes functional programming paradigms (like data-last currying). Umsizi targets straightforward, standard-library-style code for everyday projects.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

If you want to introduce a helper, ensure it meets the baseline:

1. It solves a highly recurring, real-world application problem.
2. It features bulletproof TypeScript type safety.
3. It includes comprehensive runtime and type-level tests.
4. It remains entirely dependency-free.

---

## License

MIT
