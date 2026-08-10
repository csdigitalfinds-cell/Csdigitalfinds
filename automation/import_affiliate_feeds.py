#!/usr/bin/env python3
"""Import authorized affiliate feeds into the centralized catalog.

Private feed URLs are supplied through GitHub Actions secrets. Each configured
network is merged independently so one feed cannot erase products from another.
Amazon Creators API is handled separately by import_amazon_creators.py.
"""
import csv, gzip, io, json, os, re, urllib.request
from pathlib import Path

OUT = Path('data/products.json')
NETWORKS = ('CJ', 'AWIN', 'NORDVPN', 'NORDPASS')

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'CS-Digital-Finds-Automation/1.0','Accept-Encoding':'gzip'})
    with urllib.request.urlopen(req, timeout=60) as r:
        raw = r.read(); ctype=r.headers.get('Content-Type','').lower(); cenc=r.headers.get('Content-Encoding','').lower()
    if cenc == 'gzip' or 'gzip' in ctype or raw[:2] == b'\x1f\x8b': raw=gzip.decompress(raw)
    text=raw.decode('utf-8-sig')
    if 'json' in ctype or text.lstrip().startswith(('[','{')):
        obj=json.loads(text); return obj if isinstance(obj,list) else obj.get('products',[])
    return list(csv.DictReader(io.StringIO(text)))

def value(row,*keys):
    lookup={str(k).strip().lower():v for k,v in row.items()}
    for key in keys:
        v=lookup.get(key.lower())
        if v is not None and str(v).strip(): return str(v).strip()
    return ''

def cj_image(row):
    m=re.search(r'<img[^>]+src=["\']([^"\']+)',value(row,'HTML LINKS'),re.I); return m.group(1) if m else ''

def normalize(row,network):
    if network=='CJ':
        return {'id':value(row,'LINK ID'),'title':value(row,'NAME'),'network':'cj','merchant':value(row,'ADVERTISER'),'category':value(row,'CATEGORY'),'description':value(row,'DESCRIPTION'),'image_url':cj_image(row),'affiliate_url':value(row,'CLICK URL'),'price':'','active':value(row,'RELATIONSHIP STATUS').lower() in ('active','joined','')}
    if network=='AWIN':
        return {'id':value(row,'aw_product_id','merchant_product_id'),'title':value(row,'product_name'),'network':'awin','merchant':value(row,'merchant_name'),'category':value(row,'category_name','merchant_category'),'description':value(row,'description'),'image_url':value(row,'aw_image_url','merchant_image_url'),'affiliate_url':value(row,'aw_deep_link'),'price':value(row,'display_price','search_price','store_price'),'currency':value(row,'currency'),'active':True}
    return {'id':value(row,'id','sku','product_id'),'title':value(row,'name','title','product_name') or network.title(),'network':network.lower(),'merchant':value(row,'merchant','advertiser','brand') or network.title(),'category':value(row,'category','product_type'),'description':value(row,'description','short_description'),'image_url':value(row,'image_url','image','image_link'),'affiliate_url':value(row,'affiliate_url','tracking_url','link','url'),'price':value(row,'price','sale_price'),'active':True}

def load():
    try:
        obj=json.loads(OUT.read_text(encoding='utf-8')); return obj.get('products',[]) if isinstance(obj,dict) else []
    except Exception: return []

def main():
    existing=load(); configured=[]; imported=[]
    for network in NETWORKS:
        url=os.getenv(f'{network}_FEED_URL','').strip()
        if not url: continue
        configured.append(network.lower())
        rows=fetch(url); count=0
        for row in rows:
            p=normalize(row,network)
            if p['id'] and p['title'] and p['affiliate_url'] and p['active']: imported.append(p); count+=1
        if count==0: raise SystemExit(f'{network} is configured but returned zero usable products/offers.')
    if not configured:
        print('No CJ/Awin/Nord feeds configured; preserving catalog.'); return
    keep=[p for p in existing if str(p.get('network','')).lower() not in configured]
    dedup={p.get('affiliate_url') or f"{p.get('network')}:{p.get('id')}":p for p in keep}
    for p in imported: dedup[p['affiliate_url']]=p
    OUT.parent.mkdir(parents=True,exist_ok=True); OUT.write_text(json.dumps({'products':list(dedup.values())},indent=2)+'\n',encoding='utf-8')
    print(f'Imported {len(imported)} offers from configured networks: {", ".join(configured)}')
if __name__=='__main__': main()
