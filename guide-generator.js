
function slugify(text){
  return text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') + '.html';
}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function generateGuide(e){
  e.preventDefault();
  const title = document.getElementById('guideTitle').value.trim();
  const category = document.getElementById('category').value;
  const keyword = document.getElementById('keyword').value.trim() || title;
  const url = document.getElementById('affiliateUrl').value.trim();
  const notes = document.getElementById('notes').value.trim();
  const filename = slugify(title);
  const desc = `${title}: a practical CSDigitalFinds buying guide with shopping tips, product types to consider, FAQs, and Amazon affiliate shopping link.`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} | CSDigitalFinds</title>
<meta name="description" content="${esc(desc)}">
<link rel="stylesheet" href="style.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-D1JCWWSE3Y"><\/script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-D1JCWWSE3Y');
<\/script>
</head>
<body>
<div class="topbar">CSDigitalFinds — Find Smarter. Shop Better.</div>
<header class="header">
  <div class="logo">CS<span>Digital</span>Finds</div>
  <div class="searchbar"><input placeholder="Search products, guides, deals..."><button>Search</button></div>
  <div>🛒 Deals</div>
</header>
<nav class="nav">
  <a href="index.html">Home</a>
  <a href="categories.html">Categories</a>
  <a href="products.html">Products</a>
  <a href="admin.html">Admin Board</a>
  <a href="buying-guide-generator.html">Guide Generator</a>
</nav>

<section class="hero">
  <h1>${esc(title)}</h1>
  <p>Category: <span class="gold">${esc(category)}</span></p>
</section>

<section class="section">
  <p><span class="badge">Buying Guide</span></p>
  <p>This CSDigitalFinds guide helps shoppers compare options, understand what matters, and find current Amazon selections for <strong>${esc(keyword)}</strong>.</p>

  <h2>Why this category matters</h2>
  <p>${esc(title)} is a useful shopping category because buyers usually want practical value, reliable performance, and products that solve a real everyday problem.</p>

  <h2>What to look for</h2>
  <ul>
    <li><strong>Value:</strong> Compare features against price before buying.</li>
    <li><strong>Reviews:</strong> Look for consistent customer feedback and repeated strengths or complaints.</li>
    <li><strong>Use case:</strong> Choose products that match how you actually plan to use them.</li>
    <li><strong>Warranty and support:</strong> Favor products with clear support, returns, and warranty information.</li>
    <li><strong>Size and compatibility:</strong> Make sure the product fits your home, device, vehicle, pet, or lifestyle.</li>
  </ul>

  <h2>Best for</h2>
  <p>This guide is useful for shoppers who want a quick starting point, current Amazon options, and a simple way to compare products before making a purchase.</p>

  <h2>Shop current options</h2>
  <p><a class="btn" href="${esc(url)}" target="_blank" rel="nofollow sponsored noopener">Shop ${esc(title)} on Amazon</a></p>

  <h2>Extra notes</h2>
  <p>${esc(notes || "More specific product recommendations can be added here as the catalog grows.")}</p>

  <h2>Frequently Asked Questions</h2>
  <h3>How do I choose the right product?</h3>
  <p>Start with your budget, must-have features, reviews, and how often you will use the product.</p>

  <h3>Should I always buy the cheapest option?</h3>
  <p>Not always. The best value is usually the product that balances price, durability, features, and customer satisfaction.</p>

  <h3>Does CSDigitalFinds earn commissions?</h3>
  <p>Yes. As an Amazon Associate, CSDigitalFinds may earn from qualifying purchases at no extra cost to shoppers.</p>
</section>

<footer>
  <p>© 2026 CSDigitalFinds | As an Amazon Associate, CSDigitalFinds may earn from qualifying purchases.</p>
  <p><a href="affiliate-disclosure.html">Affiliate Disclosure</a> | <a href="privacy.html">Privacy Policy</a></p>
</footer>
</body>
</html>`;
  document.getElementById('filename').value = filename;
  document.getElementById('generatedHtml').value = html;
  document.getElementById('downloadBtn').disabled = false;
}
function downloadGuide(){
  const html = document.getElementById('generatedHtml').value;
  const filename = document.getElementById('filename').value || 'buying-guide.html';
  const blob = new Blob([html], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('guideForm')?.addEventListener('submit', generateGuide);
  document.getElementById('downloadBtn')?.addEventListener('click', downloadGuide);
});
