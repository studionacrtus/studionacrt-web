// ---- Header scroll ----
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Mobile menu ----
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ---- Reveal on scroll ----
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
function observeReveals(){ document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el)); }

// ---- Load projects ----
let PROJECTS = [];
async function loadProjects(){
  try { PROJECTS = await (await fetch('projects.json')).json(); } catch(e){ PROJECTS = []; }
}

function card(p){
  return `<div class="card" data-cat="${p.category}" onclick="openProject('${p.slug}')">
    <img src="${p.images[0]}" alt="${p.title}" loading="lazy">
    <div class="card-info"><h3>${p.title}</h3><span>${p.category}${p.city ? ' &middot; ' + p.city : ''}</span></div>
  </div>`;
}

// Home featured (first 6)
async function renderFeatured(){
  await loadProjects();
  const el = document.getElementById('featured-grid');
  // Progressive enhancement: skip re-render if cards are already pre-rendered server-side.
  if (el && el.children.length === 0){ el.innerHTML = PROJECTS.slice(0,6).map(card).join(''); observeReveals(); }
}

// Projects page (all + filters)
async function renderProjects(){
  await loadProjects();
  const el = document.getElementById('all-grid');
  if (!el) return;
  // Progressive enhancement: if cards already pre-rendered server-side, keep them (just ensure reveals run).
  if (el.children.length > 0){ observeReveals(); return; }
  const cats = ['All', ...Array.from(new Set(PROJECTS.map(p=>p.category).filter(Boolean)))];
  const fl = document.getElementById('filters');
  if (fl) fl.innerHTML = cats.map((c,i)=>`<button class="${i===0?'active':''}" onclick="filter('${c}',this)">${c}</button>`).join('');
  el.innerHTML = PROJECTS.map(card).join('');
  observeReveals();
}
function filter(cat, btn){
  document.querySelectorAll('#filters button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#all-grid .card').forEach(c=>{
    c.style.display = (cat==='All' || c.dataset.cat===cat) ? '' : 'none';
  });
}

// ---- Lightbox / project viewer ----
let lbImages = [], lbIndex = 0, lbTitle = '';
function openProject(slug){
  const p = PROJECTS.find(x=>x.slug===slug); if(!p) return;
  lbImages = p.images; lbIndex = 0; lbTitle = p.title + (p.city?' &middot; '+p.city:'');
  document.getElementById('lb-thumbs').innerHTML = lbImages.map((src,i)=>`<img src="${src}" onclick="lbGo(${i})" class="${i===0?'active':''}">`).join('');
  lbRender();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function lbRender(){
  document.getElementById('lb-img').src = lbImages[lbIndex];
  document.getElementById('lb-title').innerHTML = lbTitle + ' &nbsp;(' + (lbIndex+1) + '/' + lbImages.length + ')';
  document.querySelectorAll('#lb-thumbs img').forEach((t,i)=>t.classList.toggle('active',i===lbIndex));
}
function lbGo(i){ lbIndex=(i+lbImages.length)%lbImages.length; lbRender(); }
function lbNext(){ lbGo(lbIndex+1); }
function lbPrev(){ lbGo(lbIndex-1); }
function closeLb(){ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; }
document.addEventListener('keydown', e=>{
  if(!document.getElementById('lightbox')?.classList.contains('open')) return;
  if(e.key==='ArrowRight') lbNext();
  if(e.key==='ArrowLeft') lbPrev();
  if(e.key==='Escape') closeLb();
});

// ---- Contact form (Netlify forms) ----
function handleForm(e){
  // Netlify handles submission; show a thank-you if JS present
  const f = e.target;
  if (f.dataset.ok) return true;
}

// ---- Lazy-load heavy below-fold videos (e.g. keyhole) ----
function initLazyVideos(){
  const vids = document.querySelectorAll('video.lazy-video[data-src]');
  if (!vids.length) return;
  const vio = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){
        const v = e.target;
        v.src = v.dataset.src;
        v.removeAttribute('data-src');
        v.load();
        v.play().catch(()=>{});
        vio.unobserve(v);
      }
    });
  }, { rootMargin: '300px' });
  vids.forEach(v=>vio.observe(v));
}


// ---- Homepage: Show More Projects (reveal hidden, then link to full Projects page) ----
function showMoreProjects(){
  var btn = document.getElementById('show-more-btn');
  var hidden = document.querySelectorAll('#featured-grid .more-card');
  if (hidden.length && hidden[0].style.display === 'none'){
    hidden.forEach(function(c){ c.style.display=''; });
    if (window.observeReveals) observeReveals();
    // After revealing the second batch, turn the button into a link to all projects
    btn.textContent = 'View All Projects';
    btn.onclick = function(){ window.location.href = '/projects'; };
  } else {
    window.location.href = '/projects';
  }
}

// init
document.addEventListener('DOMContentLoaded', ()=>{
  observeReveals();
  renderFeatured();
  renderProjects();
  initLazyVideos();
});
