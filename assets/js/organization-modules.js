/* داده‌های نمونه و تعامل ماژول‌های سرمایه انسانی، ارزیابی و پیگیری */
(()=> {
 const departments=[
  {id:"d1",code:"01",name:"اداری و پشتیبانی",staff:24,women:10,men:14,permanent:14,contract:6,project:4,education:8,ot:186,otAmount:74,leave:31,training:42,reward:6,discipline:1,sport:18,retirement:1,tenure:8.4,benefits:21,completion:87,onTime:91,quality:89,records:92},
  {id:"d2",code:"02",name:"تحقیق و توسعه",staff:12,women:5,men:7,permanent:7,contract:3,project:2,education:10,ot:92,otAmount:48,leave:14,training:68,reward:4,discipline:0,sport:9,retirement:0,tenure:6.8,benefits:10,completion:86,onTime:88,quality:94,records:96},
  {id:"d3",code:"03",name:"پارکبان و معبربانان",staff:86,women:12,men:74,permanent:38,contract:32,project:16,education:19,ot:1240,otAmount:496,leave:104,training:86,reward:12,discipline:7,sport:54,retirement:2,tenure:7.1,benefits:68,completion:81,onTime:84,quality:86,records:82},
  {id:"d4",code:"04",name:"تأسیسات فنی و امور نگهداری",staff:31,women:4,men:27,permanent:16,contract:10,project:5,education:11,ot:540,otAmount:270,leave:38,training:54,reward:7,discipline:3,sport:22,retirement:1,tenure:9.2,benefits:25,completion:82,onTime:86,quality:91,records:89},
  {id:"d6",code:"06",name:"فاوا و خدمات فنی",staff:17,women:6,men:11,permanent:9,contract:5,project:3,education:14,ot:214,otAmount:107,leave:19,training:72,reward:5,discipline:1,sport:13,retirement:0,tenure:5.9,benefits:14,completion:87,onTime:90,quality:93,records:95},
  {id:"d7",code:"07",name:"جمع‌آوری، نگهداری و بازیافت پسماند",staff:78,women:8,men:70,permanent:34,contract:28,project:16,education:16,ot:1080,otAmount:432,leave:96,training:78,reward:9,discipline:8,sport:49,retirement:2,tenure:8.1,benefits:61,completion:80,onTime:82,quality:84,records:80}
 ];
 const people=[
  {id:"10001",name:"کارمند نمونه الف",dept:"d1",role:"کارشناس امور اداری",status:"رسمی",education:"کارشناسی",tenure:9,training:42,ot:18,leave:2,score:91,skills:["امور اداری","مکاتبات","بایگانی"],strengths:["دقت در انجام امور","پیگیری مسئولانه"],development:"تقویت مهارت‌های تحلیل فرایند"},
  {id:"10002",name:"کارمند نمونه ب",dept:"d3",role:"سرپرست گروه میدانی",status:"قراردادی",education:"کاردانی",tenure:6,training:28,ot:46,leave:3,score:86,skills:["نظارت میدانی","ایمنی کار","گزارش‌نویسی"],strengths:["هماهنگی تیمی","پاسخ‌گویی"],development:"توسعه مهارت مدیریت تیم"},
  {id:"10003",name:"کارمند نمونه پ",dept:"d6",role:"کارشناس پشتیبانی فنی",status:"پیمانی",education:"کارشناسی ارشد",tenure:4,training:64,ot:22,leave:1,score:94,skills:["شبکه","امنیت اطلاعات","پشتیبانی سامانه"],strengths:["حل مسئله","یادگیری مستمر"],development:"توسعه مستندسازی فنی"}
 ];
 const orders=[
  {id:"R-1405-021",title:"ساماندهی گزارش‌های عملکرد ماهانه ادارات",issuer:"ریاست شرکت",date:"۱۴۰۵/۰۸/۰۲",deadline:"۱۴۰۵/۰۸/۱۲",dept:"d1",owner:"مسئول برنامه‌ریزی",source:"مکتوب",status:"تکمیل‌شده",progress:100,detail:"یکپارچه‌سازی قالب گزارش و تجمیع اطلاعات دوره‌ای"},
  {id:"R-1405-022",title:"بررسی وضعیت تجهیزات و اولویت‌بندی تعمیرات",issuer:"ریاست شرکت",date:"۱۴۰۵/۰۸/۰۳",deadline:"۱۴۰۵/۰۸/۱۵",dept:"d4",owner:"مسئول نگهداری",source:"شفاهی",status:"در حال اجرا",progress:65,detail:"تهیه فهرست تجهیزات، تعیین سطح اهمیت و برنامه اقدام"},
  {id:"R-1405-023",title:"ارائه برنامه آموزش و توانمندسازی کارکنان",issuer:"ریاست شرکت",date:"۱۴۰۵/۰۸/۰۴",deadline:"۱۴۰۵/۰۸/۱۸",dept:"d1",owner:"کارشناس آموزش",source:"مکتوب",status:"در حال اجرا",progress:45,detail:"نیازسنجی آموزشی و زمان‌بندی دوره‌های تخصصی"},
  {id:"R-1405-024",title:"ارزیابی راهکارهای نوین خدمات شهری",issuer:"ریاست شرکت",date:"۱۴۰۵/۰۸/۰۵",deadline:"۱۴۰۵/۰۸/۲۰",dept:"d2",owner:"گروه پژوهش",source:"شفاهی",status:"ابلاغ‌شده",progress:15,detail:"مطالعه گزینه‌ها و ارائه گزارش امکان‌سنجی"},
  {id:"R-1405-025",title:"بازبینی مسیرهای جمع‌آوری و زمان‌بندی ناوگان",issuer:"ریاست شرکت",date:"۱۴۰۵/۰۸/۰۶",deadline:"۱۴۰۵/۰۸/۱۶",dept:"d7",owner:"سرپرست عملیات",source:"مکتوب",status:"معوق",progress:35,detail:"بازنگری مسیرها، ظرفیت ناوگان و زمان‌بندی اجرا"},
  {id:"R-1405-026",title:"رسیدگی به نقاط پرتردد و ساماندهی محدوده‌ها",issuer:"ریاست شرکت",date:"۱۴۰۵/۰۸/۰۷",deadline:"۱۴۰۵/۰۸/۱۷",dept:"d3",owner:"مسئول ناحیه",source:"شفاهی",status:"در حال اجرا",progress:72,detail:"بازدید میدانی و تنظیم برنامه اقدام محدوده‌ها"},
  {id:"R-1405-027",title:"ارتقای پایداری سامانه‌ها و پشتیبان‌گیری",issuer:"ریاست شرکت",date:"۱۴۰۵/۰۸/۰۸",deadline:"۱۴۰۵/۰۸/۱۹",dept:"d6",owner:"کارشناس زیرساخت",source:"مکتوب",status:"تکمیل‌شده",progress:100,detail:"بازبینی نسخه پشتیبان و آزمون بازیابی اطلاعات"},
  {id:"R-1405-028",title:"تهیه گزارش هزینه و بهره‌وری خدمات",issuer:"ریاست شرکت",date:"۱۴۰۵/۰۸/۰۹",deadline:"۱۴۰۵/۰۸/۲۲",dept:"d4",owner:"کارشناس فنی",source:"شفاهی",status:"ابلاغ‌شده",progress:10,detail:"جمع‌آوری هزینه‌ها و محاسبه شاخص‌های بهره‌وری"}
 ];
 const byId=id=>departments.find(d=>d.id===id);
 const fmt=n=>Number(n).toLocaleString("fa-IR");
 const pct=n=>fmt(n)+"٪";
 const sum=k=>departments.reduce((a,d)=>a+d[k],0);
 window.CITY_ORG_DATA={departments,people,orders,byId,fmt,pct,sum};
 function initWorkforce(){
  const root=document.querySelector("[data-workforce]");
  if(!root)return;
  const totals={staff:sum("staff"),women:sum("women"),men:sum("men"),ot:sum("ot"),otAmount:sum("otAmount"),leave:sum("leave"),training:sum("training"),reward:sum("reward"),discipline:sum("discipline"),sport:sum("sport"),retirement:sum("retirement"),benefits:sum("benefits")};
  Object.entries(totals).forEach(([k,v])=>{const n=root.querySelector('[data-total="'+k+'"]');if(n)n.textContent=fmt(v)});
  const rows=root.querySelector("[data-workforce-rows]");
  if(rows)rows.innerHTML=departments.map(d=>'<tr><td>'+d.code+' · '+d.name+'</td><td>'+fmt(d.staff)+'</td><td>'+fmt(d.women)+' / '+fmt(d.men)+'</td><td>'+fmt(d.ot)+'</td><td>'+fmt(d.training)+'</td><td>'+fmt(d.benefits)+'</td></tr>').join("");
  const bars=root.querySelector("[data-workforce-bars]");
  if(bars)bars.innerHTML=departments.map(d=>'<div class="hr-bar-row"><span>'+d.name+'</span><i><b style="width:'+Math.round(d.staff/totals.staff*100)+'%"></b></i><strong>'+fmt(d.staff)+'</strong></div>').join("");
 }
 function initProfile(){
  const root=document.querySelector("[data-personnel-profile]");
  if(!root)return;
  const input=root.querySelector("[data-personnel-id]"), result=root.querySelector("[data-personnel-result]"), empty=root.querySelector("[data-personnel-empty]");
  function show(){
   const person=people.find(p=>p.id===input.value.trim());
   if(!person){result.hidden=true;empty.hidden=false;return}
   const dept=byId(person.dept);
   result.hidden=false;empty.hidden=true;
   result.querySelector("[data-person-name]").textContent=person.name;
   result.querySelector("[data-person-role]").textContent=person.role;
   result.querySelector("[data-person-dept]").textContent=dept.name;
   result.querySelector("[data-person-status]").textContent=person.status;
   result.querySelector("[data-person-education]").textContent=person.education;
   result.querySelector("[data-person-tenure]").textContent=fmt(person.tenure)+" سال";
   result.querySelector("[data-person-training]").textContent=fmt(person.training)+" ساعت";
   result.querySelector("[data-person-ot]").textContent=fmt(person.ot)+" ساعت";
   result.querySelector("[data-person-leave]").textContent=fmt(person.leave)+" روز";
   result.querySelector("[data-person-score]").textContent=pct(person.score);
   result.querySelector("[data-person-skills]").textContent=person.skills.join("، ");
   result.querySelector("[data-person-strengths]").textContent=person.strengths.join("، ");
   result.querySelector("[data-person-development]").textContent=person.development;
  }
  root.querySelector("[data-personnel-search]").addEventListener("click",show);
  input.addEventListener("keydown",e=>{if(e.key==="Enter")show()});
 }
 function initFollowups(){
  const root=document.querySelector("[data-followups]");
  if(!root)return;
  const dept=root.querySelector("[name=follow-dept]"), status=root.querySelector("[name=follow-status]"), body=root.querySelector("[data-followup-rows]");
  function render(){
   let list=orders.filter(o=>(!dept.value||o.dept===dept.value)&&(!status.value||o.status===status.value));
   body.innerHTML=list.map(o=>'<tr><td><b>'+o.id+'</b><small>'+o.source+' · '+o.date+'</small></td><td>'+o.title+'<small>'+o.detail+'</small></td><td>'+byId(o.dept).name+'<small>'+o.owner+'</small></td><td>'+o.deadline+'</td><td><div class="progress-cell"><i><b style="width:'+o.progress+'%"></b></i><strong>'+fmt(o.progress)+'٪</strong></div></td><td><span class="follow-status '+(o.status==="تکمیل‌شده"?"done":o.status==="معوق"?"late":"active")+'">'+o.status+'</span></td></tr>').join("");
   root.querySelector("[data-followup-count]").textContent=fmt(list.length);
   root.querySelector("[data-followup-done]").textContent=fmt(list.filter(o=>o.status==="تکمیل‌شده").length);
   root.querySelector("[data-followup-late]").textContent=fmt(list.filter(o=>o.status==="معوق").length);
   const avg=list.length?Math.round(list.reduce((a,o)=>a+o.progress,0)/list.length):0;
   root.querySelector("[data-followup-progress]").textContent=pct(avg);
  }
  dept.addEventListener("change",render);status.addEventListener("change",render);render();
 }
 function initEvaluation(){
  const root=document.querySelector("[data-evaluation]");
  if(!root)return;
  const weights={completion:.35,onTime:.30,quality:.20,records:.15};
  const ranked=departments.map(d=>({...d,score:Math.round(d.completion*weights.completion+d.onTime*weights.onTime+d.quality*weights.quality+d.records*weights.records)})).sort((a,b)=>b.score-a.score);
  const body=root.querySelector("[data-ranking-rows]");
  body.innerHTML=ranked.map((d,i)=>'<tr><td><b class="rank-number">'+fmt(i+1)+'</b></td><td>'+d.name+'</td><td>'+pct(d.completion)+'</td><td>'+pct(d.onTime)+'</td><td>'+pct(d.quality)+'</td><td>'+pct(d.records)+'</td><td><b>'+pct(d.score)+'</b></td></tr>').join("");
  const top=root.querySelector("[data-top-dept]");if(top)top.textContent=ranked[0].name;
 }
 document.addEventListener("DOMContentLoaded",()=>{initWorkforce();initProfile();initFollowups();initEvaluation()});
})();