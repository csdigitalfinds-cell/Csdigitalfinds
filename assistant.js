
const suggestions=[
 {k:'air fryer kitchen home',t:'Best Air Fryers Under $100',u:'best-air-fryers-under-100.html',d:'Kitchen value guide for air fryers.'},
 {k:'pet dog cat animal',t:'Best Pet Products',u:'best-pet-products.html',d:'Helpful pet product guide.'},
 {k:'office desk laptop computer work',t:'Best Home Office Accessories',u:'best-home-office-accessories.html',d:'Desk and productivity guide.'},
 {k:'smart home electronics doorbell security',t:'Best Smart Home Products',u:'best-smart-home-products.html',d:'Smart security and home tech guide.'},
 {k:'haul cheap budget deals',t:'Best Amazon Haul Finds',u:'best-amazon-haul-finds.html',d:'Budget-friendly Amazon Haul guide.'}
];
function runAssistant(){
 const q=(document.getElementById('aiQuery')?.value||'').toLowerCase();
 const r=document.getElementById('aiResult');
 if(!r)return;
 let hit=suggestions.find(x=>x.k.split(' ').some(w=>q.includes(w))) || suggestions[0];
 r.innerHTML=`<strong>${hit.t}</strong><p>${hit.d}</p><a class="btn dark" href="${hit.u}">Open Recommended Guide</a>`;
}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('aiBtn')?.addEventListener('click',runAssistant);});
