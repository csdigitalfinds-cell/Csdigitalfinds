#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json

SKIP_DIRS = {'.git', 'node_modules'}

class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links=[]; self.title=False; self.has_title=False; self.description=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='a' and a.get('href'): self.links.append((a['href'], a.get('rel','')))
        if tag=='title': self.has_title=True
        if tag=='meta' and a.get('name','').lower()=='description' and a.get('content','').strip(): self.description=True


def main():
    report={'html_files':0,'missing_title':[],'missing_description':[],'external_affiliate_links_without_sponsored':[]}
    for path in Path('.').rglob('*.html'):
        if any(part in SKIP_DIRS for part in path.parts): continue
        parser=AuditParser()
        try: parser.feed(path.read_text(encoding='utf-8', errors='ignore'))
        except Exception: continue
        report['html_files'] += 1
        if not parser.has_title: report['missing_title'].append(str(path))
        if not parser.description: report['missing_description'].append(str(path))
        for href, rel in parser.links:
            host=urlparse(href).netloc.lower()
            if host and any(x in host for x in ('amazon.', 'amzn.to', 'awin1.com', 'anrdoezrs.net', 'jdoqocy.com', 'tkqlhce.com', 'dpbolvw.net')):
                rel_tokens = rel if isinstance(rel, list) else str(rel).split()
                if 'sponsored' not in rel_tokens:
                    report['external_affiliate_links_without_sponsored'].append({'file':str(path),'url':href})
    Path('automation').mkdir(exist_ok=True)
    Path('automation/audit-report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps(report, indent=2))

if __name__=='__main__': main()
