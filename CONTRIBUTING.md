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
```

## Utility Design Guidelines

- Prefer pure functions.
- Avoid mutation unless mutation is the explicit purpose of the API.
- Keep names literal and standard-library-like.
- Do not add options objects unless they remove real API ambiguity.
- Reject helpers that are only thin aliases for existing JavaScript syntax.

## Pull Requests

A pull request should include:

- the implementation
- runtime test coverage
- type-level test coverage
- README updates when the public API changes
