---
"umsizi": minor
---

Fix the root `umsizi` entrypoint accidentally re-exporting `normalizePathname`, `hasFileExtension`, and `isRenderFunction` from the `next`/`node`/`react` subpackages. The root import now only contains the framework-agnostic core utilities, as documented; import the framework-specific helpers from `umsizi/next`, `umsizi/node`, and `umsizi/react` instead.
