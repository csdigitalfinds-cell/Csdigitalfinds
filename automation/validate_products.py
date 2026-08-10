#!/usr/bin/env python3
import json
from pathlib import Path
from urllib.parse import urlparse
CATALOG=Path('data/products.json')
REQUIRED=('id','title','network','affiliate_url')
ALLOWED_NETWORKS={'amazon','cj','awin','nordvpn','nordpass','other'}
def main():
    data=json.loads(CATALOG.read_text(encoding='utf-8')); products=data.get('products',[]); seen=set(); errors=[]
    for i,p in enumerate(products,1):
        for key in REQUIRED:
            if not str(p.get(key,'')).strip(): errors.append(f'Product {i}: missing {key}')
        identity=(str(p.get('network','')).lower().strip(),str(p.get('id','')).strip())
        if identity in seen: errors.append(f'Product {i}: duplicate network/id {identity[0]}:{identity[1]}')
        seen.add(identity)
        network=identity[0]
        if network and network not in ALLOWED_NETWORKS: errors.append(f'Product {i}: unsupported network {network}')
        url=str(p.get('affiliate_url','')).strip()
        if url:
            parsed=urlparse(url)
            if parsed.scheme not in ('http','https') or not parsed.netloc: errors.append(f'Product {i}: invalid affiliate_url')
    if errors: raise SystemExit('\n'.join(errors))
    print(f'Catalog OK: {len(products)} products')
if __name__=='__main__': main()
