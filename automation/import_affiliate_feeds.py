#!/usr/bin/env python3
"""Import normalized affiliate product feeds into data/products.json.

Feed URLs are supplied only through GitHub Actions secrets. This importer does
not scrape affiliate sites and does not invent tracking links. It accepts JSON
or CSV feeds that the publisher is authorized to use.
"""
import csv, io, json, os, urllib.request
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

def normalize(row, network):
    get=lambda *ks: next((str(row.get(k,'')).strip() for k in ks if row.get(k)), '')
    return {
      'id': get('id','sku','product_id','asin'),
      'name': get('name','title','product_name'),
      'network': network.lower(),
      'merchant': get('merchant','advertiser','brand'),
      'category': get('category','product_type'),
      'description': get('description','short_description'),
      'image_url': get('image_url','image','image_link'),
      'affiliate_url': get('affiliate_url','tracking_url','link','url'),
      'price': get('price','sale_price'),
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
            if p['name'] and p['affiliate_url']:
                products.append(p)
    if not products:
        print('No configured affiliate feeds; keeping existing catalog unchanged.')
        return
    dedup={p['affiliate_url']:p for p in products}
    OUT.write_text(json.dumps({'products':list(dedup.values())}, indent=2)+'\n', encoding='utf-8')
    print(f'Imported {len(dedup)} products from configured feeds.')

if __name__ == '__main__': main()
