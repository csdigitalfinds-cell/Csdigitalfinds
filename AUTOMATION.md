# CS Digital Finds Automation

This branch adds a safe automation foundation without changing the live storefront design.

## What is automated now

- A centralized product catalog at `data/products.json`.
- Validation of product IDs, affiliate networks, and affiliate URLs.
- A site audit for missing page titles, missing meta descriptions, and known affiliate links missing `rel="sponsored"`.
- A GitHub Actions workflow that runs on demand, on automation changes, and weekly.
- An audit report uploaded as a workflow artifact.

## Safety rules

- Affiliate credentials must never be committed to the repository.
- Future CJ, Awin, Amazon, advertising, analytics, or AI credentials belong in GitHub Actions secrets.
- Product/API imports must respect each affiliate network's current API/feed terms.
- Automated content should be factual and should not invent prices, ratings, availability, reviews, or personal product experience.
- Backlink automation should discover legitimate opportunities and prepare outreach; it should not generate spam links.
- Paid advertising automation must use explicit budget caps and should not be enabled until ad-platform credentials and campaign limits are configured.

## Product schema

Each future product should use fields like:

```json
{
  "id": "network-merchant-productid",
  "title": "Product title",
  "network": "amazon|cj|awin|other",
  "merchant": "Merchant name",
  "category": "Category",
  "affiliate_url": "https://...",
  "image_url": "https://...",
  "description": "Factual description",
  "active": true,
  "updated_at": "ISO-8601 timestamp"
}
```

## Next credential-dependent connectors

1. CJ publisher API/product feeds.
2. Awin product feeds/API.
3. Amazon affiliate product API/feed access available to the account.
4. Analytics/Search Console reporting.
5. Optional advertising/social APIs with hard spending limits.

The storefront remains unchanged until imported product data has been validated and a rendering migration is reviewed separately.
