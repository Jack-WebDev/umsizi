# Security Policy

## Supported Versions

Umsizi is currently pre-1.0 (`0.x`). Only the latest published version on npm/JSR receives security fixes.

## Reporting a Vulnerability

Please do not open a public GitHub issue for security vulnerabilities.

Instead, report it privately via [GitHub Security Advisories](https://github.com/Jack-WebDev/umsizi/security/advisories/new) for this repository. Include:

- A description of the vulnerability and its impact.
- Steps to reproduce, or a minimal reproduction.
- The affected version(s).

You should expect an initial response within 5 business days. Once a fix is available, it will be released as a patch version and an advisory will be published.

## Scope

Umsizi has zero runtime dependencies, so there is no third-party dependency attack surface to report against. Reports should be limited to vulnerabilities in Umsizi's own source code (e.g. prototype pollution, ReDoS in path/string utilities, type confusion that leads to unsafe behavior at runtime).

## Supply Chain

Published packages are built and released exclusively via the [`release` GitHub Actions workflow](.github/workflows/release.yml), using [npm provenance](https://docs.npmjs.com/generating-provenance-statements) so consumers can verify that a given package version was built from this repository's source and CI.
