(()=> {
 const root=document.querySelector("[data-org-calendar]");
 if(!root)return;
 const departments={"1":"اداره اداری و پشتیبانی","2":"اداره تحقیق و توسعه","3":"اداره پارک بان و معبربانان","4":"اداره تأسیسات فنی و امور نگهداری","6":"اداره فاوا و خدمات فنی","7":"اداره جمع‌آوری، نگهداری و بازیافت پسماند"};
 const events=[
  {date:"2026-11-22",type:"meeting",dept:"all",title:"نشست راهبری و مرور اولویت‌های شرکت",detail:"بررسی وضعیت اقدامات جاری، موانع اجرایی و تصمیم‌های بین‌اداره‌ای",time:"۰۹:۰۰",place:"اتاق جلسات ستاد"},
  {date:"2026-11-04",type:"meeting",dept:"1",title:"جلسه بررسی امور پرسنلی",detail:"بررسی درخواست‌ها و برنامه‌های امور اداری",time:"۱۰:۰۰",place:"اداره اداری و پشتیبانی"},
  {date:"2026-11-06",type:"session",dept:"2",title:"نشست بررسی طرح‌های پژوهشی",detail:"ارزیابی پیشرفت طرح‌ها و تعیین گام‌های بعدی",time:"۱۱:۰۰",place:"اداره تحقیق و توسعه"},
  {date:"2026-11-05",type:"meeting",dept:"3",title:"جلسه هماهنگی عملیات میدانی",detail:"هماهنگی سرپرستان و برنامه عملیات مناطق",time:"۰۸:۳۰",place:"اداره پارک بان و معبربانان"},
  {date:"2026-11-07",type:"meeting",dept:"4",title:"جلسه برنامه نگهداری تأسیسات",detail:"مرور برنامه تعمیرات و اولویت‌بندی تجهیزات",time:"۰۹:۳۰",place:"اداره تأسیسات فنی"},
  {date:"2026-11-08",type:"meeting",dept:"6",title:"جلسه پایش زیرساخت و سامانه‌ها",detail:"بررسی پایداری خدمات و برنامه ارتقای زیرساخت",time:"۱۰:۰۰",place:"اداره فاوا"},
  {date:"2026-11-09",type:"meeting",dept:"7",title:"جلسه هماهنگی عملیات پسماند",detail:"هماهنگی برنامه جمع‌آوری و مدیریت مسیرها",time:"۰۸:۰۰",place:"اداره پسماند"},
  {date:"2026-11-11",type:"action",dept:"1",title:"کارگاه آموزش و توسعه کارکنان",detail:"اجرای برنامه آموزشی دوره و ثبت حضور کارکنان",time:"۰۹:۰۰",place:"سالن آموزش"},
  {date:"2026-11-10",type:"session",dept:"3",title:"نشست سرپرستان مناطق",detail:"بررسی گزارش‌های میدانی و هماهنگی عملیات",time:"۰۹:۰۰",place:"اداره پارک بان و معبربانان"},
  {date:"2026-11-12",type:"action",dept:"4",title:"بازدید فنی دوره‌ای",detail:"کنترل وضعیت تجهیزات و ثبت موارد نیازمند اقدام",time:"۰۸:۰۰",place:"محدوده عملیاتی"},
  {date:"2026-11-13",type:"meeting",dept:"2",title:"جلسه شورای تحقیق و توسعه",detail:"ارائه نتایج مطالعات و تعیین اولویت‌های پژوهشی",time:"۱۱:۰۰",place:"اداره تحقیق و توسعه"},
  {date:"2026-11-14",type:"session",dept:"6",title:"نشست امنیت و پایداری خدمات",detail:"مرور رخدادها و برنامه تداوم خدمت",time:"۱۰:۳۰",place:"اداره فاوا"},
  {date:"2026-11-15",type:"session",dept:"7",title:"نشست ارزیابی مسیرهای جمع‌آوری",detail:"بررسی ظرفیت ناوگان و اصلاح برنامه مسیرها",time:"۰۹:۰۰",place:"اداره پسماند"},
  {date:"2026-11-16",type:"action",dept:"3",title:"پایش برنامه ساماندهی معابر",detail:"بازبینی نقاط پرتردد و ثبت نتیجه اقدامات",time:"۰۷:۳۰",place:"محدوده عملیاتی"},
  {date:"2026-11-17",type:"action",dept:"1",title:"بازبینی پرونده‌های استخدامی",detail:"کنترل و تکمیل سوابق اداری",time:"۰۹:۰۰",place:"اداره اداری و پشتیبانی"},
  {date:"2026-11-18",type:"action",dept:"6",title:"اجرای برنامه ارتقای تجهیزات",detail:"به‌روزرسانی و تحویل تجهیزات برنامه‌ریزی‌شده",time:"۰۸:۳۰",place:"اداره فاوا"},
  {date:"2026-11-19",type:"action",dept:"2",title:"ارائه نتایج مطالعات دوره‌ای",detail:"جمع‌بندی گزارش پژوهشی و ارائه به مدیریت",time:"۱۱:۰۰",place:"اداره تحقیق و توسعه"},
  {date:"2026-11-20",type:"action",dept:"4",title:"کنترل وضعیت تجهیزات و تأسیسات",detail:"بازبینی فنی و ثبت گزارش نگهداری",time:"۰۸:۰۰",place:"اداره تأسیسات فنی"},
  {date:"2026-11-21",type:"action",dept:"7",title:"پایش برنامه تفکیک و بازیافت",detail:"ارزیابی شاخص‌های اجرایی و ثبت گزارش",time:"۰۷:۰۰",place:"اداره پسماند"},
  {date:"2026-11-11",type:"personal",dept:"2",title:"مناسبت تولد همکاران",detail:"۲ مناسبت پرسنلی در این بازه",personCount:2,time:"",place:"اداره تحقیق و توسعه"},
  {date:"2026-11-18",type:"personal",dept:"1",title:"سالگرد ازدواج همکاران",detail:"۱ مناسبت پرسنلی در این بازه",personCount:1,time:"",place:"اداره اداری و پشتیبانی"},
  {date:"2026-11-26",type:"personal",dept:"3",title:"مناسبت ازدواج همکاران",detail:"۱ مناسبت پرسنلی در این بازه",personCount:1,time:"",place:"اداره پارک بان و معبربانان"},
  {date:"2026-11-29",type:"personal",dept:"7",title:"مناسبت تولد همکاران",detail:"۱ مناسبت پرسنلی در این بازه",personCount:1,time:"",place:"اداره پسماند"},
  {date:"2026-11-03",type:"resolution",dept:"1",orderId:"R-1405-021",title:"مصوبه یکپارچه‌سازی گزارش عملکرد ماهانه",detail:"",time:"",place:""},
  {date:"2026-11-06",type:"resolution",dept:"4",orderId:"R-1405-022",title:"مصوبه اولویت‌بندی تعمیرات تجهیزات",detail:"",time:"",place:""},
  {date:"2026-11-07",type:"resolution",dept:"7",orderId:"R-1405-025",title:"مصوبه بازنگری مسیرهای جمع‌آوری پسماند",detail:"",time:"",place:""}
 ];
 const shared=window.CITY_ORG_DATA;
 if(shared)events.forEach(e=>{if(e.orderId){const o=shared.orders.find(x=>x.id===e.orderId);if(o){e.title=o.title;e.detail="مخاطب اجرا: "+shared.byId(o.dept).name+" · مسئول: "+o.owner+" · پرونده "+o.id;e.place="مهلت "+o.deadline+" · "+o.status;}}});
 const typeNames={meeting:"جلسه",session:"نشست",action:"اقدام",personal:"مناسبت پرسنلی",resolution:"مصوبه ریاست"};
 const fa=new Intl.DateTimeFormat("fa-IR-u-ca-persian",{day:"numeric"});
 const fullDate=new Intl.DateTimeFormat("fa-IR-u-ca-persian",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
 const monthTitle=new Intl.DateTimeFormat("fa-IR-u-ca-persian",{month:"long",year:"numeric"});
 const keyOf=d=>{const p=new Intl.DateTimeFormat("en-US-u-ca-persian",{year:"numeric",month:"numeric"}).formatToParts(d);return p.find(x=>x.type==="year").value+"/"+p.find(x=>x.type==="month").value};
 const iso=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");
 const fromIso=s=>{const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d,12)};
 const dayNumber=d=>fa.format(d);
 const typeFilter=root.querySelector("[data-calendar-type]");
 const deptFilter=root.querySelector("[data-calendar-dept]");
 const grid=root.querySelector("[data-calendar-grid]");
 const list=root.querySelector("[data-calendar-events]");
 const selectedTitle=root.querySelector("[data-selected-title]");
 const monthLabel=root.querySelector("[data-calendar-month]");
 const personalList=root.querySelector("[data-personal-events]");
 let selected=new Date();selected.setHours(12,0,0,0);
 let monthStart=startOfMonth(selected);
 function startOfMonth(d){const x=new Date(d);x.setHours(12,0,0,0);const k=keyOf(x);while(true){const p=new Date(x);p.setDate(p.getDate()-1);if(keyOf(p)!==k)break;x.setTime(p.getTime());}return x;}
 function monthDays(first){const k=keyOf(first);let n=0;const x=new Date(first);while(keyOf(x)===k){n++;x.setDate(x.getDate()+1);}return n;}
 function filtered(){return events.filter(e=>(typeFilter.value==="all"||e.type===typeFilter.value)&&(deptFilter.value==="all"||e.dept==="all"||e.dept===deptFilter.value));}
 function card(e){const d=fromIso(e.date);return '<article class="calendar-event"><div class="calendar-event-date"><b>'+dayNumber(d)+'</b><span>'+new Intl.DateTimeFormat("fa-IR-u-ca-persian",{month:"short"}).format(d)+'</span></div><div class="calendar-event-content"><b>'+e.title+'</b><p>'+e.detail+'</p><div class="calendar-event-meta"><span>'+typeNames[e.type]+'</span><span>'+ (e.dept==="all"?"ستاد شرکت":departments[e.dept])+'</span>'+(e.time?'<span>'+e.time+'</span>':'')+(e.place?'<span>'+e.place+'</span>':'')+'</div></div></article>';}
 function renderGrid(){
  monthLabel.textContent=monthTitle.format(monthStart);
  const first=new Date(monthStart);const offset=(first.getDay()+1)%7;const total=monthDays(first);const rows=Math.ceil((offset+total)/7);const today=iso(new Date());
  const all=filtered();let html="";
  for(let i=0;i<rows*7;i++){const d=new Date(first);d.setDate(d.getDate()-offset+i);const date=iso(d);const dayEvents=all.filter(e=>e.date===date);const outside=keyOf(d)!==keyOf(first);const classes=["calendar-day",outside?"outside":"",date===iso(selected)?"selected":"",date===today?"today":""].filter(Boolean).join(" ");const dots=dayEvents.slice(0,4).map(e=>'<em class="'+e.type+'"></em>').join("");html+='<button type="button" class="'+classes+'" data-day="'+date+'"><b>'+dayNumber(d)+'</b><i>'+dots+'</i></button>';}
  grid.innerHTML=html;
  grid.querySelectorAll("[data-day]").forEach(b=>b.addEventListener("click",()=>{selected=fromIso(b.dataset.day);if(keyOf(selected)!==keyOf(monthStart))monthStart=startOfMonth(selected);render();}));
 }
 function renderList(){
  const day=iso(selected);const matches=filtered().filter(e=>e.date===day).sort((a,b)=>a.type.localeCompare(b.type));
  selectedTitle.textContent=fullDate.format(selected);
  if(matches.length)list.innerHTML=matches.map(card).join("");
  else{const upcoming=filtered().filter(e=>e.date>day).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3);list.innerHTML='<div class="calendar-empty">برای این روز رویدادی ثبت نشده است.</div>'+(upcoming.length?'<h3 class="calendar-selected-title">رویدادهای نزدیک</h3>'+upcoming.map(card).join(""):"");}
 }
 function renderPersonal(){const p=events.filter(e=>e.type==="personal").sort((a,b)=>a.date.localeCompare(b.date));personalList.innerHTML=p.map(card).join("");}
 function render(){renderGrid();renderList();}
 root.querySelector("[data-cal-prev]").addEventListener("click",()=>{const p=new Date(monthStart);p.setDate(p.getDate()-1);monthStart=startOfMonth(p);selected=new Date(monthStart);render();});
 root.querySelector("[data-cal-next]").addEventListener("click",()=>{const n=new Date(monthStart);n.setDate(n.getDate()+monthDays(monthStart));monthStart=startOfMonth(n);selected=new Date(monthStart);render();});
 typeFilter.addEventListener("change",render);deptFilter.addEventListener("change",render);
 root.querySelectorAll("[data-calendar-count]").forEach(n=>{n.textContent=new Intl.NumberFormat("fa-IR").format(events.filter(e=>e.type===n.dataset.calendarCount).length);});
 const personSummary=root.querySelector("[data-calendar-person-summary]");
 if(personSummary){
  const people=[
   {id:"۱۰۰۰۱",name:"کارمند نمونه الف",dept:"اداره اداری و پشتیبانی",meetings:0,actions:1,milestones:1},
   {id:"۱۰۰۰۲",name:"کارمند نمونه ب",dept:"اداره پارک بان و معبربانان",meetings:0,actions:1,milestones:0},
   {id:"۱۰۰۰۳",name:"کارمند نمونه پ",dept:"اداره فاوا و خدمات فنی",meetings:0,actions:1,milestones:0}
  ];
  personSummary.innerHTML=people.map(p=>"<tr><td>"+p.name+" · "+p.id+"</td><td>"+p.dept+"</td><td>"+p.meetings+"</td><td>"+p.actions+"</td><td>"+p.milestones+"</td><td>"+(p.meetings+p.actions+p.milestones)+"</td></tr>").join("");
 }
 const summary=root.querySelector("[data-calendar-department-summary]");
 if(summary){
  const staff={"1":24,"2":12,"3":86,"4":31,"6":17,"7":78};
  summary.innerHTML=Object.entries(departments).map(([id,name])=>{
   const list=events.filter(e=>e.dept===id);
   const sessions=list.filter(e=>e.type==="meeting"||e.type==="session").length;
   const actions=list.filter(e=>e.type==="action"||e.type==="resolution").length;
   const milestones=list.filter(e=>e.type==="personal").reduce((n,e)=>n+(e.personCount||1),0);
   return "<tr><td>"+name+"</td><td>"+staff[id]+"</td><td>"+list.length+"</td><td>"+sessions+"</td><td>"+actions+"</td><td>"+milestones+"</td></tr>";
  }).join("");
 }
 render();renderPersonal();
})();
