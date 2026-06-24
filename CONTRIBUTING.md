# Contributing

## Standards

Every utility added to Umsizi should satisfy all of the following:

1. It solves a recurring problem in real TypeScript application code.
2. It has a small, obvious API.
3. It preserves useful type information without requiring consumer-side casts.
4. It is covered by runtime tests and type-level tests.
5. It does not introduce runtime dependencies.

## Local Workflow

Install dependencies:

```bash
pnpm install
```

Run the main checks:

```bash
pnpm run lint
pnpm run check-types
pnpm run test
pnpm run build
pnpm run check:package
```

Apply local autofixes when needed:

```bash
pnpm run lint:fix
pnpm run format
```

## Utility Design Guidelines

- Prefer pure functions.
- Avoid mutation unless mutation is the explicit purpose of the API.
- Keep names literal and standard-library-like.
- Do not add options objects unless they remove real API ambiguity.
- Reject helpers that are only thin aliases for existing JavaScript syntax.
- Trust the TypeScript signature; do not add runtime validation or `throw` for
  inputs that already violate the declared types. See [README § Error Handling
  Philosophy](./README.md#error-handling-philosophy). If a new utility
  genuinely needs to validate untrusted input (not just type-violating input),
  call that out explicitly in the PR description so it can be reviewed as an
  exception.
- Add a JSDoc block with at least one `@example` for every exported function.
- New utilities require both a test file and a JSDoc block before merge —
  treat these as part of "the implementation," not optional follow-up.

## Pull Requests

A pull request should include:

- the implementation
- runtime test coverage
- type-level test coverage
- a `docs/<name>.md` page for every new or changed utility (see existing
  pages in [`docs/`](./docs/README.md) for the expected format)
- a one-line entry + link in README.md's API Reference index, and a link
  from `docs/README.md`, when the public API changes

## Releases

- Versioning and release PRs are managed with Changesets.
- npm publishing is handled by GitHub Actions through npm trusted publishing (OIDC), not an `NPM_TOKEN` repository secret.
- Before relying on the release workflow, configure the `umsizi` package on npm to trust the `.github/workflows/release.yml` workflow in `Jack-WebDev/umsizi`.
