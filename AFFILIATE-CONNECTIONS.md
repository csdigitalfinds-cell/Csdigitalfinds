# Affiliate connections

CS Digital Finds can import authorized product feeds without storing credentials in public code.

## Required GitHub Actions secrets

Add only the feed/API URLs issued or authorized by each network:

- `CJ_FEED_URL`
- `AWIN_FEED_URL`
- `AMAZON_FEED_URL`

Repository path: Settings > Secrets and variables > Actions > New repository secret.

Do not commit passwords, API tokens, secret keys, verification codes, or private feed URLs to repository files.

## Safety behavior

If no feed secrets are configured, the importer exits successfully and leaves the existing product catalog unchanged. It never creates guessed affiliate links and does not scrape Amazon, CJ, or Awin websites.

## Publishing policy

Feed import and validation are separated from storefront rendering. New feed data should be reviewed before automatic publication is enabled. This prevents malformed feeds, expired links, or unexpected merchant data from overwriting the live storefront.
