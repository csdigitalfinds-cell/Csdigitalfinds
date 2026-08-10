#!/usr/bin/env python3
"""Import Amazon products through Amazon Creators API into data/products.json.

Credentials are read only from environment variables/GitHub Actions secrets.
Existing non-Amazon products are preserved. Missing credentials skip the import;
configured credentials that Amazon rejects fail the workflow so the problem is visible.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

OUT = Path("data/products.json")
TOKEN_URL = "https://api.amazon.com/auth/o2/token"
API_URL = "https://creatorsapi.amazon/catalog/v1/searchItems"
MARKETPLACE = "www.amazon.com"

SEARCHES = [
    ("Electronics", "popular electronics"),
    ("HomeAndKitchen", "home kitchen essentials"),
    ("Beauty", "beauty personal care"),
    ("Fashion", "fashion accessories"),
    ("SportsAndOutdoors", "sports outdoors"),
    ("Automotive", "automotive accessories"),
    ("Books", "bestselling books"),
    ("ToysAndGames", "toys games"),
]


def request_json(url, payload, headers=None):
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST", headers={
        "Content-Type": "application/json",
        "User-Agent": "CS-Digital-Finds-Automation/1.0",
        **(headers or {}),
    })
    with urllib.request.urlopen(req, timeout=60) as response:
        return json.loads(response.read().decode("utf-8"))


def get_token(client_id, client_secret):
    data = request_json(TOKEN_URL, {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
        "scope": "creatorsapi::default",
    })
    return data["access_token"]


def display_value(obj, *path):
    for key in path:
        if not isinstance(obj, dict):
            return ""
        obj = obj.get(key, {})
    if isinstance(obj, dict):
        return str(obj.get("displayValue", "") or "")
    return str(obj or "")


def normalize(item, category):
    asin = str(item.get("asin", "")).strip()
    info = item.get("itemInfo", {}) or {}
    images = item.get("images", {}) or {}
    primary = images.get("primary", {}) or {}
    image = (primary.get("medium") or primary.get("large") or primary.get("small") or {})
    image_url = image.get("url", "") if isinstance(image, dict) else ""
    title = display_value(info, "title")
    byline = info.get("byLineInfo", {}) or {}
    brand = display_value(byline, "brand") or display_value(byline, "manufacturer")
    return {
        "id": asin,
        "name": title,
        "network": "amazon",
        "merchant": brand or "Amazon",
        "category": category,
        "description": "",
        "image_url": image_url,
        "affiliate_url": str(item.get("detailPageURL", "")).strip(),
        "price": "",
        "active": True,
    }


def load_existing():
    if not OUT.exists():
        return []
    try:
        obj = json.loads(OUT.read_text(encoding="utf-8"))
        return obj.get("products", []) if isinstance(obj, dict) else []
    except Exception:
        return []


def main():
    client_id = os.getenv("AMAZON_CREATOR_CREDENTIAL_ID", "").strip()
    client_secret = os.getenv("AMAZON_CREATOR_SECRET", "").strip()
    partner_tag = os.getenv("AMAZON_PARTNER_TAG", "csdigitalfinds-20").strip()
    if not client_id or not client_secret:
        print("Amazon Creators API credentials not configured; keeping catalog unchanged.")
        return

    try:
        token = get_token(client_id, client_secret)
        amazon_products = []
        for category, keywords in SEARCHES:
            response = request_json(API_URL, {
                "partnerTag": partner_tag,
                "marketplace": MARKETPLACE,
                "keywords": keywords,
                "searchIndex": "All",
                "itemCount": 10,
                "resources": ["images.primary.medium", "itemInfo.title", "itemInfo.byLineInfo"],
            }, {
                "Authorization": f"Bearer {token}",
                "x-marketplace": MARKETPLACE,
            })
            items = ((response.get("searchResult") or {}).get("items") or [])
            for item in items:
                product = normalize(item, category)
                if product["id"] and product["name"] and product["affiliate_url"]:
                    amazon_products.append(product)
    except urllib.error.HTTPError as exc:
        detail = ""
        try:
            detail = exc.read().decode("utf-8", errors="replace")[:500]
        except Exception:
            pass
        print(f"Amazon Creators API HTTP error {exc.code}. {detail}", file=sys.stderr)
        raise SystemExit(1)
    except (urllib.error.URLError, KeyError, ValueError) as exc:
        print(f"Amazon Creators API import failed: {exc}", file=sys.stderr)
        raise SystemExit(1)

    if not amazon_products:
        print("Amazon Creators API returned zero usable products; failing rather than reporting a false success.", file=sys.stderr)
        raise SystemExit(1)

    existing = [p for p in load_existing() if str(p.get("network", "")).lower() != "amazon"]
    dedup = {p.get("affiliate_url") or f"{p.get('network')}:{p.get('id')}": p for p in existing}
    for product in amazon_products:
        dedup[product["affiliate_url"]] = product
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"products": list(dedup.values())}, indent=2) + "\n", encoding="utf-8")
    print(f"Imported {len(amazon_products)} Amazon products through Creators API.")


if __name__ == "__main__":
    main()
