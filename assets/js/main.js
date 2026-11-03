const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.dash-nav')||document.querySelector('.main-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));}
const dateNode=document.getElementById('live-date');
const clockNode=document.getElementById('live-clock');
function updateClock(){const now=new Date();if(dateNode)dateNode.textContent=new Intl.DateTimeFormat('fa-IR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(now);if(clockNode)clockNode.textContent=new Intl.DateTimeFormat('fa-IR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(now);}
updateClock();if(clockNode)window.setInterval(updateClock,1000);
const search=document.getElementById('department-search');
const cards=[...document.querySelectorAll('.department-card')];
const empty=document.getElementById('no-results');
if(search){search.addEventListener('input',()=>{const q=search.value.trim().toLocaleLowerCase('fa');let visible=0;cards.forEach(card=>{const match=card.dataset.name.toLocaleLowerCase('fa').includes(q);card.hidden=!match;if(match)visible++;});if(empty)empty.hidden=visible!==0;});}
