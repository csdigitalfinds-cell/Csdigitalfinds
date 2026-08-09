#!/usr/bin/env python3
"""Import authorized affiliate JSON/CSV feeds into data/products.json."""
import csv, io, json, os, re, urllib.request
from pathlib import Path

OUT = Path('data/products.json')
NETWORKS = ('CJ', 'AWIN', 'AMAZON')

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'CS-Digital-Finds-Automation/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        raw = r.read().decode('utf-8-sig')
        ctype = r.headers.get('Content-Type','')
    if 'json' in ctype or raw.lstrip().startswith(('[','{')):
        obj = json.loads(raw)
        return obj if isinstance(obj, list) else obj.get('products', [])
    return list(csv.DictReader(io.StringIO(raw)))

def value(row, *keys):
    # Match both normalized feeds and network exports regardless of header case.
    lookup = {str(k).strip().lower(): v for k, v in row.items()}
    for key in keys:
        v = lookup.get(key.lower())
        if v is not None and str(v).strip():
            return str(v).strip()
    return ''

def cj_image(row):
    html = value(row, 'HTML LINKS')
    m = re.search(r'<img[^>]+src=["\']([^"\']+)', html, re.I)
    return m.group(1) if m else ''

def normalize(row, network):
    if network == 'CJ':
        return {
          'id': value(row, 'LINK ID'),
          'name': value(row, 'NAME'),
          'network': 'cj',
          'merchant': value(row, 'ADVERTISER'),
          'category': value(row, 'CATEGORY'),
          'description': value(row, 'DESCRIPTION'),
          'image_url': cj_image(row),
          'affiliate_url': value(row, 'CLICK URL'),
          'price': '',
          'active': value(row, 'RELATIONSHIP STATUS').lower() in ('active','joined','')
        }
    return {
      'id': value(row,'id','sku','product_id','asin'),
      'name': value(row,'name','title','product_name'),
      'network': network.lower(),
      'merchant': value(row,'merchant','advertiser','brand'),
      'category': value(row,'category','product_type'),
      'description': value(row,'description','short_description'),
      'image_url': value(row,'image_url','image','image_link'),
      'affiliate_url': value(row,'affiliate_url','tracking_url','link','url'),
      'price': value(row,'price','sale_price'),
      'active': True
    }

def main():
    products=[]
    for network in NETWORKS:
        url=os.getenv(f'{network}_FEED_URL','').strip()
        if not url:
            continue
        for row in fetch(url):
            p=normalize(row, network)
            if p['name'] and p['affiliate_url'] and p['active']:
                products.append(p)
    if not products:
        print('No configured affiliate feeds; keeping existing catalog unchanged.')
        return
    dedup={p['affiliate_url']:p for p in products}
    OUT.write_text(json.dumps({'products':list(dedup.values())}, indent=2)+'\n', encoding='utf-8')
    print(f'Imported {len(dedup)} products/offers from configured feeds.')

if __name__ == '__main__': main()
