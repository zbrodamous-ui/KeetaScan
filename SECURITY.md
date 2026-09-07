# KeetaView Security

This document records KeetaView's security boundaries, risks, and defensive improvements.

## Trust Boundaries

KeetaView receives data across these boundaries:

1. Browser to KeetaView server
2. KeetaView server to SQLite database
3. KeetaView server to the Keeta network
4. KeetaView server to CoinGecko
5. GitHub to Railway deployment

Data crossing any boundary must be validated and handled safely.

## Security Goals

### Confidentiality

Sensitive information must be visible only to authorized people and systems.

KeetaView examples:
- API keys and secrets must never appear in browser code.
- Environment variables must never be committed to GitHub.
- Internal database files must not be publicly downloadable.

### Integrity

Information and code must not be altered without authorization.

KeetaView examples:
- API input must be validated before it reaches database queries.
- Deployments should come only from the protected GitHub repository.
- Indexed blockchain records should not be silently modified.

### Availability

The application should remain accessible and recover from failures.

KeetaView examples:
- Excessive requests should not overwhelm the server.
- CoinGecko failures should not break the Analytics page.
- The indexed database should survive deployments and restarts.

## Dependency Review

### 2026-09-07 npm audit

- 18 known dependency vulnerabilities reported
- 1 critical, 4 high, 10 moderate, and 3 low
- Findings are transitive dependencies of `@keetanetwork/keetanet-client`
- Installed Keeta client version: `0.18.4`
- Latest available Keeta client version: `0.18.4`
- Automatic fixes have not been applied
- Reachability and compatibility require review before remediation

Priority areas:
- Availability risks in `@grpc/grpc-js` and `ws`
- Multipart request risks in `form-data`
- Cryptographic implementation risk in `elliptic`
- Input-handling risks in `lodash`

## Implemented Controls

### Content Security Policy

On 2026-09-07, KeetaView deployed and tested an enforced Content Security Policy.

The policy:
- Restricts scripts to KeetaView and the official Keeta browser-library domain
- Permits required WebAssembly without allowing general JavaScript evaluation
- Restricts images, styles, connections, forms, and base URLs
- Blocks embedded objects
- Prevents the site from being framed

The policy was tested in Report-Only mode across all major pages before enforcement.