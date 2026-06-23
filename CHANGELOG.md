# umsizi

## 0.5.0

### Minor Changes

- 1ca57ef: - Add DX-first object guard and key assertion helpers: `isPlainObject`, `isRecord`, `hasKeys`, `requireKeys`, and `assertKeys`.

## 0.4.0

### Minor Changes

- 4e39a0b: Fix the root `umsizi` entrypoint accidentally re-exporting `normalizePathname`, `hasFileExtension`, and `isRenderFunction` from the `next`/`node`/`react` subpackages. The root import now only contains the framework-agnostic core utilities, as documented; import the framework-specific helpers from `umsizi/next`, `umsizi/node`, and `umsizi/react` instead.

## 0.3.0

### Minor Changes

- 1899979: add utility functions for object manipulation and corresponding examples

## 0.2.2

### Patch Changes

- 1f08f8d: update ci

## 0.2.1

### Patch Changes

- 05023c7: trigger new publish

## 0.2.0

### Minor Changes

- 916a77d: Add examples, jsdocs and test coverage
