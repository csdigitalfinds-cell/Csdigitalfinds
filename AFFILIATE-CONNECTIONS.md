# Affiliate connections

CS Digital Finds uses one unified automation path for authorized affiliate sources while keeping all private values in GitHub Actions secrets.

## Connections

Amazon Creators API:
- `AMAZON_CREATOR_CREDENTIAL_ID`
- `AMAZON_CREATOR_SECRET`
- partner tag is configured by the workflow

Authorized feeds/tracking exports:
- `CJ_FEED_URL`
- `AWIN_FEED_URL`
- `NORDVPN_FEED_URL`
- `NORDPASS_FEED_URL`

Do not commit passwords, API tokens, secret keys, verification codes, or private feed URLs to repository files.

## Safety behavior

Each feed is merged independently. A configured feed that returns zero usable offers fails visibly rather than silently reporting success. An unconfigured feed is skipped without erasing another network's catalog. Amazon authentication errors fail visibly. Existing networks are preserved when another network imports.

## Publishing

After all configured sources import successfully, the catalog is validated once and changes are persisted to `main`. This repair branch does not run production affiliate APIs automatically; it is intended to be merged only when the required account-issued secrets are present.
