/* Cursor with smooth follow */
(function(){
  const outline=document.getElementById('c-outline');
  const dot=document.getElementById('c-dot');
  if(!outline||!dot)return;
  let mx=0,my=0,ox=0,oy=0;
  addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+'px';dot.style.top=my+'px';
  });
  function tick(){
    ox+=(mx-ox)*.18;oy+=(my-oy)*.18;
    outline.style.left=ox+'px';outline.style.top=oy+'px';
    requestAnimationFrame(tick);
  }
  tick();
  document.querySelectorAll('a,button,input,textarea,.proj,.other-item,.pill,.skill-row').forEach(el=>{
    el.addEventListener('mouseenter',()=>outline.classList.add('hover'));
    el.addEventListener('mouseleave',()=>outline.classList.remove('hover'));
  });
})();

/* Nav scroll */
const navbar=document.getElementById('navbar');
const sections=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-links a');
addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',scrollY>10);
  let cur='';
  sections.forEach(s=>{if(scrollY>=s.offsetTop-140)cur=s.id});
  navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* Ink reveal */
document.querySelectorAll('.ink-reveal').forEach(el=>{
  const text=el.dataset.text||el.textContent;
  el.innerHTML='';
  [...text].forEach((ch,i)=>{
    const s=document.createElement('span');
    s.className='char';
    s.textContent=ch===' '?'\u00A0':ch;
    s.style.transitionDelay=(i*0.04)+'s';
    el.appendChild(s);
  });
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('visible')));
});

/* Reveal observer */
const io=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* Mobile menu */
document.getElementById('mobileToggle')?.addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('mobile-open');
});

(function(){
  const el = document.getElementById('availability-status');
  if (!el) return;
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear();
  el.textContent = `Available — ${month} ${year}`;
})();

/* Contact form: there is no backend, so hand the message to the visitor's email app */
function handleForm(e){
  e.preventDefault();
  const f=e.target;
  const field=n=>f.elements.namedItem(n).value.trim();
  const name=field('name'),email=field('email'),message=field('message');
  const subject=`Portfolio contact — ${name}`;
  const body=`${message}\n\n— ${name} (${email})`;
  location.href=`mailto:loor200529@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const btn=f.querySelector('.form-submit');
  btn.textContent='Opening your email app…';
  setTimeout(()=>{btn.textContent='Send Message →'},3500);
}
