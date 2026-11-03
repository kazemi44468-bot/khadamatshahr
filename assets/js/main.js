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
 const reportCatalog=prefix+'report-catalog.html';
 const reportArchive=prefix+'report-archive.html';
 const communications=prefix+'internal-communications.html';
 const welfare=prefix+'welfare-center.html';
 const coop=prefix+'staff-coop-store.html';
 const services=prefix+'company-services.html';
 const workforce=prefix+'workforce.html';
 const profile=prefix+'personnel-profile.html';
 const evaluation=prefix+'performance-evaluation.html';
 const followups=prefix+'special-followups.html';
 const calendar=prefix+'calendar.html';
 const notices=prefix+'notifications-center.html';
 const nav=document.querySelector('.ops-nav');
 if(nav){
  nav.innerHTML='<a href="'+home+'">نمای کلان</a><details class="nav-dropdown"><summary>ادارات کل</summary><div class="nav-menu"><a href="'+prefix+'department-1.html">اداره اداری و پشتیبانی</a><a href="'+prefix+'department-2.html">اداره تحقیق و توسعه</a><a href="'+prefix+'department-3.html">اداره پارک بان و معبربانان</a><a href="'+prefix+'department-4.html">اداره تأسیسات فنی و امور نگهداری</a><a href="'+prefix+'department-6.html">اداره فاوا و خدمات فنی</a><a href="'+prefix+'department-7.html">اداره جمع‌آوری، نگهداری و بازیافت پسماند</a></div></details><details class="nav-dropdown"><summary>مدیریت و ارزیابی</summary><div class="nav-menu"><a href="'+workforce+'">مرکز سرمایه انسانی</a><a href="'+profile+'">پروفایل عملکرد پرسنل</a><a href="'+evaluation+'">ارزیابی و رتبه‌بندی</a><a href="'+followups+'">پیگیری دستورات و مصوبات</a><a href="'+notices+'">مرکز اعلانات ریاست</a><a href="'+calendar+'">تقویم و برنامه زمان‌بندی</a><a href="'+reportCatalog+'">کاتالوگ گزارش‌های دوره‌ای</a><a href="'+reportArchive+'">آرشیو گزارش‌ها</a></div></details><details class="nav-dropdown"><summary>مرکز خدمات</summary><div class="nav-menu"><a href="'+services+'">نمای کلی مرکز خدمات</a><a href="'+communications+'">ارتباطات امن کارکنان</a><a href="'+welfare+'">مرکز خدمات رفاهی</a><a href="'+coop+'">تعاونی مصرف کارکنان</a></div></details><details class="nav-dropdown"><summary>گزارش‌ها</summary><div class="nav-menu"><a href="'+reports+'">گزارش تلفیقی</a><a href="'+reportCatalog+'">کاتالوگ گزارش‌های دوره‌ای</a></div></details>';
  const current=location.pathname.split('/').pop();
  nav.querySelectorAll('.nav-dropdown').forEach(menu=>{if(menu.querySelector('a[href$="'+current+'"]'))menu.querySelector('summary').classList.add('active')});
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
  [workforce,'▤','سرمایه انسانی','workforce.html'],
  [followups,'◷','پیگیری ویژه','special-followups.html'],
  [reportCatalog,'▧','کاتالوگ','report-catalog.html'],
  [calendar,'▦','تقویم','calendar.html']
 ];
 const current=location.pathname.split('/').pop();
 items.forEach(([href,icon,label,key])=>{
  const a=document.createElement('a');a.href=href;a.innerHTML='<span aria-hidden="true">'+icon+'</span>'+label;
  if(key===current || (key==='index.html'&&current==='index.html') || (key==='departments'&&((current.startsWith('department-')&&current!=='department-reports.html')||(current==='index.html'&&location.hash==='#departments'))))a.classList.add('active');
  dock.appendChild(a);
 });
 body.appendChild(dock);
})();


/* گزارش‌ساز تعاملی و نمودارهای متحرک */
(()=> {
 const root=document.querySelector('[data-report-builder]');
 if(!root)return;
 const departments=[
  {id:'d1',name:'اداری و پشتیبانی',staff:24,ot:186,bonus:148,skill:8,reward:6,discipline:1,actions:38,done:33},
  {id:'d2',name:'تحقیق و توسعه',staff:12,ot:92,bonus:96,skill:9,reward:4,discipline:0,actions:21,done:18},
  {id:'d3',name:'پارکبان و معبربانان',staff:86,ot:1240,bonus:420,skill:18,reward:12,discipline:7,actions:246,done:199},
  {id:'d4',name:'تأسیسات فنی و نگهداری',staff:31,ot:540,bonus:265,skill:11,reward:7,discipline:3,actions:94,done:77},
  {id:'d6',name:'فاوا و خدمات فنی',staff:17,ot:214,bonus:185,skill:10,reward:5,discipline:1,actions:67,done:58},
  {id:'d7',name:'جمع‌آوری و بازیافت پسماند',staff:78,ot:1080,bonus:390,skill:15,reward:9,discipline:8,actions:312,done:249}
 ];
 const metrics={
  actions:{label:'اقدامات ثبت‌شده',unit:'مورد',key:'actions'},
  staff:{label:'نیروی انسانی',unit:'نفر',key:'staff'},
  ot:{label:'ساعات اضافه‌کاری',unit:'ساعت',key:'ot'},
  bonus:{label:'مبالغ کارانه',unit:'میلیون تومان',key:'bonus'},
  skill:{label:'نیروهای دارای مهارت تخصصی',unit:'نفر',key:'skill'},
  reward:{label:'تشویقات ثبت‌شده',unit:'مورد',key:'reward'},
  discipline:{label:'تنبیهات و تذکرات',unit:'مورد',key:'discipline'},
  done:{label:'اقدامات تکمیل‌شده',unit:'مورد',key:'done'}
 };
 const $=s=>root.querySelector(s);
 const fmt=n=>Number(n).toLocaleString('fa-IR');
 const chosen=()=>[...root.querySelectorAll('[data-dept]:checked')].map(x=>departments.find(d=>d.id===x.dataset.dept)).filter(Boolean);
 const periodFactor=()=>({week:.22,month:.42,quarter:.72,half:1,year:1.85})[$('[name=period]').value]||1;
 const periodLabel=()=>({week:'هفتگی',month:'ماهانه',quarter:'فصلی',half:'شش‌ماهه',year:'سالانه'})[$('[name=period]').value];
 function values(list,key){return list.map(d=>Math.round(d[key]*periodFactor()));}
 function render(){
  const list=chosen(), key=$('[name=topic]').value, meta=metrics[key], vals=values(list,key), total=vals.reduce((a,b)=>a+b,0);
  const allStaff=list.reduce((a,d)=>a+d.staff,0);
  const totalActions=list.reduce((a,d)=>a+d.actions,0);
  const done=list.reduce((a,d)=>a+d.done,0);
  $('#report-selected-count').textContent=fmt(list.length)+' اداره انتخاب‌شده';
  $('#report-period-label').textContent='بازه '+periodLabel();
  $('#report-metric-label').textContent=meta.label;
  $('#report-metric-total').textContent=fmt(total);
  $('#report-metric-unit').textContent=meta.unit;
  $('#report-staff-total').textContent=fmt(allStaff);
  $('#report-actions-total').textContent=fmt(Math.round(totalActions*periodFactor()));
  $('#report-completion').textContent=(totalActions?Math.round(done/totalActions*100):0).toLocaleString('fa-IR')+'٪';
  $('#report-chart-title').textContent='مقایسه '+meta.label+' بین ادارات';
  $('#report-chart-sub').textContent='مقادیر بر اساس '+periodLabel()+' و ادارات انتخاب‌شده';
  const max=Math.max(1,...vals);
  $('#report-bars').innerHTML=list.length?list.map((d,i)=>'<div class="report-bar-item" title="'+d.name+' · '+fmt(vals[i])+'"><b>'+fmt(vals[i])+'</b><i style="--bar:'+Math.max(5,vals[i]/max*100)+'%"></i><small>'+d.name+'</small></div>').join(''):'<p class="report-empty-state">برای نمایش نمودار، حداقل یک اداره را انتخاب کنید.</p>';
  const series=list.map((d,i)=>({name:d.name,value:vals[i]}));
  const sum=series.reduce((a,x)=>a+x.value,0)||1;
  let cursor=0; const colors=['#477b59','#c2a36a','#789b83','#8d9d91','#6a8b9a','#b58a70'];
  const stops=series.map((x,i)=>{const start=cursor;cursor+=x.value/sum*100;return colors[i%colors.length]+' '+start+'% '+cursor+'%'}).join(',');
  $('#report-donut').style.background=series.length?'conic-gradient('+stops+')':'#e6ece4';
  $('#report-donut-total').textContent=fmt(sum);
  $('#report-legend').innerHTML=series.map((x,i)=>'<span><i style="background:'+colors[i%colors.length]+'"></i>'+x.name+' · '+fmt(x.value)+'</span>').join('');
  const trendMonths={week:['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه'],month:['هفته ۱','هفته ۲','هفته ۳','هفته ۴','هفته ۵','هفته ۶'],quarter:['ماه ۱','ماه ۲','ماه ۳','ماه ۴','ماه ۵','ماه ۶'],half:['ماه ۱','ماه ۲','ماه ۳','ماه ۴','ماه ۵','ماه ۶'],year:['فصل ۱','فصل ۲','فصل ۳','فصل ۴','فصل ۵','فصل ۶']}[$('[name=period]').value];
  const trend=list.map((d,i)=>{const base=d[key];return trendMonths.map((m,j)=>Math.round(base*periodFactor()*(.48+j*.105+(i%3)*.018)))});
  const width=680,height=190,pad=28,maxTrend=Math.max(1,...trend.flat());
  const paths=trend.map((arr,i)=>{const pts=arr.map((v,j)=>[pad+j*(width-2*pad)/5,height-pad-v/maxTrend*(height-2*pad)]);return '<polyline class="trend-series" style="--series-delay:'+i*.12+'s;stroke:'+colors[i%colors.length]+'" points="'+pts.map(p=>p.join(',')).join(' ')+'"/>'+pts.map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3" fill="'+colors[i%colors.length]+'"/>').join('')}).join('');
  $('#report-trend').innerHTML='<svg viewBox="0 0 '+width+' '+height+'" role="img" aria-label="نمودار روند متحرک">'+[35,75,115,155].map(y=>'<path d="M20 '+y+'H660" class="trend-grid"/>').join('')+paths+'</svg><div class="trend-labels">'+trendMonths.map(m=>'<span>'+m+'</span>').join('')+'</div>';
  $('#report-trend-legend').innerHTML=series.map((x,i)=>'<span><i style="background:'+colors[i%colors.length]+'"></i>'+x.name+'</span>').join('');
  $('#report-comparison-table tbody').innerHTML=list.map((d,i)=>'<tr><td>'+d.name+'</td><td>'+fmt(vals[i])+'</td><td>'+fmt(d.staff)+'</td><td>'+fmt(Math.round(d.actions*periodFactor()))+'</td><td>'+fmt(Math.round(d.done/Math.max(1,d.actions)*100))+'٪</td></tr>').join('');
 }
 root.querySelectorAll('input,select').forEach(el=>el.addEventListener('change',render));
 $('#select-all-depts').addEventListener('click',()=>{root.querySelectorAll('[data-dept]').forEach(x=>x.checked=true);render()});
 $('#clear-depts').addEventListener('click',()=>{root.querySelectorAll('[data-dept]').forEach(x=>x.checked=false);render()});
 render();
})();