const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.dash-nav')||document.querySelector('.main-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));}

const dateNode=document.getElementById('date')||document.getElementById('live-date');
const clockNode=document.getElementById('clock')||document.getElementById('live-clock');
function updateClock(){
 const now=new Date();
 if(dateNode)dateNode.textContent=new Intl.DateTimeFormat('fa-IR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(now);
 if(clockNode)clockNode.textContent=new Intl.DateTimeFormat('fa-IR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(now);
}
updateClock();
if(clockNode)window.setInterval(updateClock,1000);

const search=document.getElementById('department-search');
const cards=[...document.querySelectorAll('.ops-card[data-name],.department-card[data-name]')];
const empty=document.getElementById('no-results');
if(search){
 search.addEventListener('input',()=>{
  const q=search.value.trim().toLocaleLowerCase('fa');
  let visible=0;
  cards.forEach(card=>{
   const match=(card.dataset.name||card.textContent).toLocaleLowerCase('fa').includes(q);
   card.hidden=!match;
   if(match)visible++;
  });
  if(empty)empty.hidden=visible!==0;
 });
}

/* دکمه شناور بازگشت به ابتدای صفحه */
(()=>{
 const button=document.createElement('button');
 button.type='button';
 button.className='back-to-top';
 button.setAttribute('aria-label','بازگشت به بالای صفحه');
 button.setAttribute('title','بازگشت به بالا');
 button.innerHTML='<span aria-hidden="true">↑</span>';
 document.body.appendChild(button);
 const refresh=()=>button.classList.toggle('is-visible',window.scrollY>320);
 window.addEventListener('scroll',refresh,{passive:true});
 button.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
 refresh();
})();


/* منوی یکپارچه صفحات عملیاتی و ناوبری موبایل */
(()=>{
 const body=document.body;
 if(!body.classList.contains('ops-page'))return;
 const inPages=location.pathname.includes('/pages/');
 const prefix=inPages?'':'pages/';
 const home=inPages?'../index.html':'index.html';
 const reports=prefix+'department-reports.html';
 const services=prefix+'company-services.html';
 const nav=document.querySelector('.ops-nav');
 if(nav){
  nav.innerHTML='<a href="'+home+'">نمای کلان</a><a href="'+home+'#departments">ادارات کل</a><a href="'+reports+'">گزارش تلفیقی</a><a href="'+services+'">مرکز خدمات</a>';
  const current=location.pathname.split('/').pop();
  nav.querySelectorAll('a').forEach(a=>{
   const target=a.getAttribute('href').split('#')[0].split('/').pop();
   if(target===current || (current==='index.html'&&a.getAttribute('href').includes('#departments')))a.classList.add('active');
  });
 }
 const dock=document.createElement('nav');
 dock.className='mobile-dock';
 dock.setAttribute('aria-label','منوی موبایل');
 const items=[
  [home,'⌂','نمای کلان','index.html'],
  [home+'#departments','▦','ادارات','departments'],
  [reports,'▤','گزارش تلفیقی','department-reports.html'],
  [services,'⌘','مرکز خدمات','company-services.html']
 ];
 const current=location.pathname.split('/').pop();
 items.forEach(([href,icon,label,key])=>{
  const a=document.createElement('a');a.href=href;a.innerHTML='<span aria-hidden="true">'+icon+'</span>'+label;
  if(key===current || (key==='index.html'&&current==='index.html') || (key==='departments'&&((current.startsWith('department-')&&current!=='department-reports.html')||(current==='index.html'&&location.hash==='#departments'))))a.classList.add('active');
  dock.appendChild(a);
 });
 body.appendChild(dock);
})();
