const PRODUCTS = [
  {
    "name": "Ring Video Doorbell",
    "category": "Smart Home",
    "link": "https://amzn.to/4fm7SIV",
    "desc": "Smart doorbell pick for security, visitors, deliveries, and home monitoring.",
    "icon": "\ud83d\udd14"
  },
  {
    "name": "Featured Amazon Deal",
    "category": "Electronics",
    "link": "https://amzn.to/4f4t70P",
    "desc": "Featured tech and electronics pick for launch day shoppers.",
    "icon": "\ud83c\udfa7"
  },
  {
    "name": "Amazon Product Pick",
    "category": "Home & Kitchen",
    "link": "https://amzn.to/4eKv6s8",
    "desc": "Useful home product recommendation for everyday value.",
    "icon": "\ud83c\udfe0"
  },
  {
    "name": "Smart Home Security Pick",
    "category": "Smart Home",
    "link": "https://amzn.to/4fm7SIV",
    "desc": "A practical smart home upgrade for safer, more convenient living.",
    "icon": "\ud83d\udca1"
  },
  {
    "name": "Daily Deal Pick",
    "category": "Featured Deals",
    "link": "https://amzn.to/4f4t70P",
    "desc": "Launch day affiliate deal added to the featured catalog.",
    "icon": "\ud83d\udd25"
  },
  {
    "name": "Home Upgrade Pick",
    "category": "Home & Kitchen",
    "link": "https://amzn.to/4eKv6s8",
    "desc": "A useful home and kitchen recommendation for shoppers.",
    "icon": "\ud83c\udf73"
  },
  {
    "name": "Automotive Value Pick",
    "category": "Automotive",
    "link": "https://amzn.to/4f4t70P",
    "desc": "Automotive accessory pick for drivers and vehicle owners.",
    "icon": "\ud83d\ude97"
  },
  {
    "name": "Beauty & Grooming Pick",
    "category": "Beauty",
    "link": "https://amzn.to/4eKv6s8",
    "desc": "Beauty and grooming product recommendation for everyday care.",
    "icon": "\u2728"
  },
  {
    "name": "Gift Idea Pick",
    "category": "Gift Ideas",
    "link": "https://amzn.to/4fm7SIV",
    "desc": "A gift-friendly product pick for family, friends, and everyday shoppers.",
    "icon": "\ud83c\udf81"
  },
  {
    "name": "Best Value Product",
    "category": "Featured Deals",
    "link": "https://amzn.to/4f4t70P",
    "desc": "Featured value product for shoppers looking for useful finds.",
    "icon": "\ud83c\udfc6"
  }
];
function productCard(p){return `<div class="product"><span class="badge">${p.category}</span><div class="product-img">${p.icon}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="stars">★★★★★</div><div class="price">Check current price on Amazon</div><a class="shop" href="${p.link}" target="_blank" rel="nofollow sponsored noopener">View on Amazon</a></div>`}
function renderProducts(){const h=document.getElementById('productGrid');if(!h)return;const cat=h.dataset.category;const q=(document.getElementById('siteSearch')?.value||'').toLowerCase();h.innerHTML=PRODUCTS.filter(p=>(!cat||p.category===cat)&& (p.name+p.category+p.desc).toLowerCase().includes(q)).map(productCard).join('')}
function renderRows(){const b=document.getElementById('adminRows');if(!b)return;b.innerHTML=PRODUCTS.map(p=>`<tr><td>${p.name}</td><td>${p.category}</td><td><a href="${p.link}" target="_blank">Open Link</a></td></tr>`).join('')}
document.addEventListener('DOMContentLoaded',()=>{renderProducts();renderRows();document.getElementById('siteSearch')?.addEventListener('input',renderProducts);});
