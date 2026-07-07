const CATEGORIES = [
  {
    "title": "Electronics",
    "icon": "\ud83d\udcbb",
    "desc": "Shop tech, gadgets, accessories, audio, smart devices, and everyday electronics.",
    "url": "https://www.amazon.com/gp/browse.html?node=172282&linkCode=ll2&tag=csdigitalfind-20&linkId=c01e00adbdf1cd12f9ec068c3cab60a2&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Computers & Accessories",
    "icon": "\ud83d\udda5\ufe0f",
    "desc": "Browse computers, monitors, keyboards, storage, accessories, and office tech.",
    "url": "https://www.amazon.com/gp/browse.html?node=541966&linkCode=ll2&tag=csdigitalfind-20&linkId=1dbbafabb605f9f4d4345b3af075f2cd&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Home & Kitchen",
    "icon": "\ud83c\udfe0",
    "desc": "Find kitchen gadgets, home organization, cleaning tools, appliances, and comfort upgrades.",
    "url": "https://www.amazon.com/gp/browse.html?node=1055398&linkCode=ll2&tag=csdigitalfind-20&linkId=24f36e6d1eff2af4cc6c81959da3ea27&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Beauty & Personal Care",
    "icon": "\u2728",
    "desc": "Shop grooming, skincare, hair care, personal care, and beauty essentials.",
    "url": "https://www.amazon.com/gp/browse.html?node=3760911&linkCode=ll2&tag=csdigitalfind-20&linkId=a81794de88cc7a50b6f2a3b1900abf8b&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Clothing, Shoes & Jewelry",
    "icon": "\ud83d\udc55",
    "desc": "Explore fashion, shoes, accessories, jewelry, and everyday style finds.",
    "url": "https://www.amazon.com/gp/browse.html?node=7141123011&linkCode=ll2&tag=csdigitalfind-20&linkId=068281e34877a56d0974022907884796&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Books",
    "icon": "\ud83d\udcda",
    "desc": "Browse books, audiobooks, education picks, personal growth, business, and entertainment reading.",
    "url": "https://www.amazon.com/gp/browse.html?node=3375251&linkCode=ll2&tag=csdigitalfind-20&linkId=41069123e28cbbb19550285d50bd8efe&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Toys & Games",
    "icon": "\ud83e\uddf8",
    "desc": "Find toys, games, puzzles, learning gifts, family fun, and kid-friendly picks.",
    "url": "https://www.amazon.com/gp/browse.html?node=6563140011&linkCode=ll2&tag=csdigitalfind-20&linkId=9579c77f6c040e9f768d8deb8537c684&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Toys & Games Best Sellers",
    "icon": "\ud83c\udfb2",
    "desc": "Explore popular toys and games currently trending with shoppers.",
    "url": "https://www.amazon.com/gp/browse.html?node=165793011&linkCode=ll2&tag=csdigitalfind-20&linkId=106a581328f050aa836a1b58471b8b3e&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Pet Supplies",
    "icon": "\ud83d\udc36",
    "desc": "Shop dog, cat, fish, bird, and small pet products, grooming, feeding, and comfort items.",
    "url": "https://www.amazon.com/gp/browse.html?node=2619533011&linkCode=ll2&tag=csdigitalfind-20&linkId=88d981f83acf7016066152b3c1d27924&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Movies & TV",
    "icon": "\ud83c\udfac",
    "desc": "Browse movies, shows, collectibles, media, and home entertainment finds.",
    "url": "https://www.amazon.com/gp/browse.html?node=16310091&linkCode=ll2&tag=csdigitalfind-20&linkId=1fe0ae8beef3f0a24240c82a2e10dd36&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Video Games",
    "icon": "\ud83c\udfae",
    "desc": "Shop games, accessories, consoles, digital gaming, and entertainment gear.",
    "url": "https://www.amazon.com/gp/browse.html?node=2350149011&linkCode=ll2&tag=csdigitalfind-20&linkId=3ca8d18387d6f6b32b00475efcd50e44&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Amazon Luna",
    "icon": "\u2601\ufe0f",
    "desc": "Explore Amazon Luna cloud gaming and gaming entertainment options.",
    "url": "https://www.amazon.com/luna?&linkCode=ll2&tag=csdigitalfind-20&linkId=4fec13bec3bdaed3ace8265f90af3f0f&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Sports & Outdoors",
    "icon": "\ud83c\udfc3",
    "desc": "Browse fitness gear, outdoor equipment, sports products, camping, and recreation finds.",
    "url": "https://www.amazon.com/fmc/everyday-essentials-category?node=16310101&linkCode=ll2&tag=csdigitalfind-20&linkId=79fa1cf5fbeb7e2c30d80ebf12a330f8&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Everyday Essentials",
    "icon": "\ud83d\uded2",
    "desc": "Shop everyday household, grocery, personal care, and daily-use essentials.",
    "url": "https://www.amazon.com/fmc/everyday-essentials?&linkCode=ll2&tag=csdigitalfind-20&linkId=529abbaa52ba2829e01ab32bb22d3cfd&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Amazon Haul",
    "icon": "\ud83d\udecd\ufe0f",
    "desc": "Browse budget-friendly Amazon Haul finds and trending low-cost products.",
    "url": "https://www.amazon.com/haul/store?&linkCode=ll2&tag=csdigitalfind-20&linkId=e4653c2cd2c6e7abbf20481edeb3b91c&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "New Releases",
    "icon": "\ud83c\udd95",
    "desc": "Discover newly released products across Amazon categories.",
    "url": "https://www.amazon.com/gp/new-releases?&linkCode=ll2&tag=csdigitalfind-20&linkId=c1648a2b8ff3120f23b5931a8cb161ac&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Amazon Renewed Best Sellers",
    "icon": "\u267b\ufe0f",
    "desc": "Shop popular renewed and refurbished products backed by Amazon Renewed.",
    "url": "https://www.amazon.com/Best-Sellers-Amazon-Renewed/zgbs/amazon-renewed?&linkCode=ll2&tag=csdigitalfind-20&linkId=69125db5cd3a9bfefd78a713e58454ff&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Whole Foods Market",
    "icon": "\ud83e\udd6c",
    "desc": "Browse Whole Foods Market items, groceries, pantry picks, and household essentials.",
    "url": "https://www.amazon.com/alm/storefront?almBrandId=VUZHIFdob2xlIEZvb2Rz&linkCode=ll2&tag=csdigitalfind-20&linkId=21fc4984313bb2c19037c2904f466a69&language=en_US&ref_=as_li_ss_tl"
  }
];
const PRODUCTS = [
  {
    "title": "Ring Video Doorbell",
    "icon": "\ud83d\udd14",
    "category": "Smart Home",
    "desc": "Smart security pick for front doors, packages, and visitor monitoring.",
    "url": "https://amzn.to/4fm7SIV"
  },
  {
    "title": "Launch Featured Pick",
    "icon": "\u2b50",
    "category": "Featured Deal",
    "desc": "Featured Amazon product ready for CSDigitalFinds visitors.",
    "url": "https://amzn.to/4f4t70P"
  },
  {
    "title": "Amazon Product Pick",
    "icon": "\ud83d\uded2",
    "category": "Featured Deal",
    "desc": "Launch product recommendation for shoppers browsing CSDigitalFinds.",
    "url": "https://amzn.to/4eKv6s8"
  },
  {
    "title": "Amazon Product Feature",
    "icon": "\ud83d\udd25",
    "category": "Trending",
    "desc": "A featured individual product link collected for the launch catalog.",
    "url": "https://www.amazon.com/dp/B0DCCNHWV5?&linkCode=ll2&tag=csdigitalfind-20&linkId=782b8ec6b537e12b2dda8de4e2eb1d12&language=en_US&ref_=as_li_ss_tl"
  },
  {
    "title": "Electronics Quick Pick",
    "icon": "\ud83c\udfa7",
    "category": "Electronics",
    "desc": "Fast product find for tech shoppers and gadget buyers.",
    "url": "https://amzn.to/4vminRw"
  },
  {
    "title": "Electronics Deal Pick",
    "icon": "\ud83d\udcbb",
    "category": "Electronics",
    "desc": "Another launch product pick for the electronics catalog.",
    "url": "https://amzn.to/4f8VTxn"
  }
];
function cardCategory(c){return `<div class="cat"><div class="icon">${c.icon}</div><h3>${c.title}</h3><p>${c.desc}</p><a href="${c.url}" target="_blank" rel="nofollow sponsored noopener">Shop Now</a></div>`}
function cardProduct(p){return `<div class="product"><span class="badge">${p.category}</span><div class="icon">${p.icon}</div><h3>${p.title}</h3><p>${p.desc}</p><div class="stars">★★★★★</div><div class="price">Check current price on Amazon</div><a class="shop" href="${p.url}" target="_blank" rel="nofollow sponsored noopener">View on Amazon</a></div>`}
function query(){return (document.getElementById('siteSearch')?.value||'').toLowerCase()}
function renderCategories(){const h=document.getElementById('categoryGrid'); if(!h)return; const q=query(); h.innerHTML=CATEGORIES.filter(c=>(c.title+c.desc).toLowerCase().includes(q)).map(cardCategory).join('')}
function renderProducts(){const h=document.getElementById('productGrid'); if(!h)return; const q=query(); h.innerHTML=PRODUCTS.filter(p=>(p.title+p.category+p.desc).toLowerCase().includes(q)).map(cardProduct).join('')}
function renderAdmin(){const cats=document.getElementById('adminCats'); if(cats) cats.innerHTML=CATEGORIES.map(c=>`<tr><td>${c.icon} ${c.title}</td><td><a href="${c.url}" target="_blank">Open</a></td></tr>`).join(''); const prods=document.getElementById('adminProducts'); if(prods) prods.innerHTML=PRODUCTS.map(p=>`<tr><td>${p.icon} ${p.title}</td><td>${p.category}</td><td><a href="${p.url}" target="_blank">Open</a></td></tr>`).join('')}
document.addEventListener('DOMContentLoaded',()=>{renderCategories();renderProducts();renderAdmin();document.getElementById('siteSearch')?.addEventListener('input',()=>{renderCategories();renderProducts();});});
