#!/usr/bin/env python3
import json
from pathlib import Path
from urllib.parse import urlparse

CATALOG = Path('data/products.json')
REQUIRED = ('id', 'title', 'network', 'affiliate_url')
ALLOWED_NETWORKS = {'amazon', 'cj', 'awin', 'other'}


def main():
    data = json.loads(CATALOG.read_text(encoding='utf-8'))
    products = data.get('products', [])
    seen = set()
    errors = []
    for i, product in enumerate(products, 1):
        for key in REQUIRED:
            if not str(product.get(key, '')).strip():
                errors.append(f'Product {i}: missing {key}')
        pid = str(product.get('id', '')).strip()
        if pid in seen:
            errors.append(f'Product {i}: duplicate id {pid}')
        seen.add(pid)
        network = str(product.get('network', '')).lower().strip()
        if network and network not in ALLOWED_NETWORKS:
            errors.append(f'Product {i}: unsupported network {network}')
        url = str(product.get('affiliate_url', '')).strip()
        if url:
            parsed = urlparse(url)
            if parsed.scheme not in ('http', 'https') or not parsed.netloc:
                errors.append(f'Product {i}: invalid affiliate_url')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'Catalog OK: {len(products)} products')


if __name__ == '__main__':
    main()
