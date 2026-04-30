// ── PAGE NAVIGATION ──
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.getElementById('nav-'+id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  document.getElementById('navLinks').classList.remove('open');
  setTimeout(revealOnScroll,100);
}

// ── MOBILE MENU ──
function toggleMenu(){
  document.getElementById('navLinks').classList.toggle('open');
}

// ── SCROLL NAV ──
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>20);
  revealOnScroll();
});

// ── SCROLL REVEAL ──
function revealOnScroll(){
  const els=document.querySelectorAll('.page.active .reveal,.page.active .reveal-left,.page.active .reveal-right');
  els.forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.top<window.innerHeight-80){el.classList.add('visible')}
  });
}
setTimeout(revealOnScroll,200);

// ── CURSOR ──
const dot=document.getElementById('curDot');
const ring=document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=mx+'px';dot.style.top=my+'px';
});
function animCursor(){
  rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.svc-card,.port-card,.team-card,.testi-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hovered'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hovered'));
});

// ── CARD GLOW ──
function cardGlow(el,e){
  const r=el.getBoundingClientRect();
  const x=((e.clientX-r.left)/r.width)*100;
  const y=((e.clientY-r.top)/r.height)*100;
  el.style.setProperty('--mx',x+'%');
  el.style.setProperty('--my',y+'%');
}

// ── FILTER BUTTONS ──
document.querySelectorAll('.fbtn').forEach(btn=>{
  btn.addEventListener('click',function(){
    this.closest('.filter-row').querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── FORM SUBMIT ──
function handleSubmit(btn){
  btn.innerHTML='<span>✓ Message Sent! We\'ll be in touch soon.</span>';
  btn.style.background='#009A5E';
  btn.disabled=true;
}

// ── TICKER DUPLICATE ──
(function(){
  const t=document.getElementById('ticker');
  if(t){t.innerHTML+=t.innerHTML}
})();

const homeOfferModalEl=document.getElementById('homeOfferModal');
let homeOfferModalShown=false;

function tryOpenHomeOfferModal(){
  if(homeOfferModalShown||!homeOfferModalEl||typeof bootstrap==='undefined'){return}
  const homePage=document.getElementById('page-home');
  if(!homePage||!homePage.classList.contains('active')){return}
  homeOfferModalShown=true;
  new bootstrap.Modal(homeOfferModalEl).show();
}

window.addEventListener('load',()=>{
  setTimeout(tryOpenHomeOfferModal,6000);
});
