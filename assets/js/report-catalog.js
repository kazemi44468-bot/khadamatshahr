(()=> {
 const root=document.getElementById("catalog-document");
 if(!root)return;
 const data=window.CITY_ORG_DATA;
 const $=id=>document.getElementById(id);
 const fmt=n=>Number(n||0).toLocaleString("fa-IR");
 const sum=k=>data.departments.reduce((n,d)=>n+(d[k]||0),0);
 const labels={month:"گزارش ماهانه",quarter:"گزارش فصلی",half:"گزارش شش‌ماهه",year:"گزارش سالانه",custom:"گزارش بازه دلخواه"};
 function render(){
  const period=$("catalog-period").value,from=$("catalog-from").value,to=$("catalog-to").value,scope=$("catalog-scope").value;
  $("catalog-period-label").textContent=labels[period]+" · "+from+" تا "+to;
  $("catalog-generated").textContent="تاریخ تولید: "+new Intl.DateTimeFormat("fa-IR",{dateStyle:"long"}).format(new Date());
  const orders=data.orders,done=orders.filter(o=>o.status==="تکمیل‌شده").length,late=orders.filter(o=>o.status==="معوق").length,active=orders.length-done-late;
  $("catalog-kpis").innerHTML=[["نیروی انسانی",sum("staff")+" نفر"],["اقدامات ثبت‌شده","۷۷۸ مورد"],["دستورها و مصوبات",orders.length+" مورد"],["تکمیل‌شده",done+" مورد"],["معوق",late+" مورد"],["ساعات اضافه‌کاری",sum("ot")+" ساعت"]].map(x=>"<article><small>"+x[0]+"</small><b>"+x[1]+"</b></article>").join("");
  $("catalog-executive-summary").innerHTML="<p>در داده نمونه جاری، تعداد کارکنان در شش اداره "+fmt(sum("staff"))+" نفر است. مجموع ساعات اضافه‌کاری ثبت‌شده "+fmt(sum("ot"))+" ساعت و ساعات آموزش "+fmt(sum("training"))+" ساعت گزارش شده است.</p><p>از "+fmt(orders.length)+" دستور و پیگیری نمونه، "+fmt(done)+" مورد تکمیل‌شده، "+fmt(active)+" مورد در جریان یا ابلاغ‌شده و "+fmt(late)+" مورد معوق است. موارد معوق باید در مرکز اعلانات ریاست بررسی شوند.</p><p>این خروجی، ساختار کاتالوگ دوره‌ای را نشان می‌دهد؛ مقادیر عملکرد عملیاتی و منابع انسانی هنوز از داده‌های نمونه نسخه نمایشی استفاده می‌کنند.</p>";
  $("catalog-departments").innerHTML=data.departments.map(d=>"<tr><td>"+d.code+" · "+d.name+"</td><td>"+fmt(d.staff)+"</td><td>"+fmt(d.records||0)+"</td><td>"+fmt(Math.round((d.records||0)*(d.completion||0)/100))+"</td><td>"+fmt(d.ot)+"</td><td>"+fmt(d.training)+"</td></tr>").join("");
  $("catalog-dept-notes").innerHTML=["بیشترین ظرفیت نیروی انسانی در اداره پارکبان و معبربانان و اداره پسماند متمرکز است.","برای تحلیل بهره‌وری، تعداد اقدامات باید در کنار کیفیت، زمان انجام و سطح خدمت سنجیده شود.","مقایسه نهایی ادارات باید بر اساس داده‌های هم‌دوره و تعاریف شاخص یکسان انجام شود."].map(x=>"<li>"+x+"</li>").join("");
  $("catalog-hr-kpis").innerHTML=[["کل کارکنان",sum("staff")+" نفر"],["آموزش",sum("training")+" ساعت"],["مرخصی",sum("leave")+" روز"],["تشویق",sum("reward")+" مورد"],["تذکر",sum("discipline")+" مورد"],["رفاهیات",sum("benefits")+" مورد"]].map(x=>"<article><small>"+x[0]+"</small><b>"+x[1]+"</b></article>").join("");
  $("catalog-hr-table").innerHTML=data.departments.map(d=>"<tr><td>"+d.name+"</td><td>"+fmt(d.staff)+"</td><td>"+fmt(d.ot)+"</td><td>"+fmt(d.training)+"</td><td>"+fmt(d.leave)+"</td><td>"+fmt(d.reward)+"</td><td>"+fmt(d.discipline)+"</td></tr>").join("");
  $("catalog-assets").innerHTML=data.departments.map(d=>{const a=data.inventories[d.code]||data.inventories[String(Number(d.code))]||[];const total=a.reduce((n,x)=>n+x[1],0);return "<tr><td>"+d.name+"</td><td>"+fmt(a[0]?.[1]||0)+"</td><td>"+fmt(a[1]?.[1]||0)+"</td><td>"+fmt(a[2]?.[1]||0)+"</td><td>"+fmt(total)+"</td></tr>";}).join("");
  $("catalog-order-kpis").innerHTML=[["کل ارجاعات",orders.length],["تکمیل‌شده",done],["در جریان / ابلاغ",active],["معوق",late]].map(x=>"<article><small>"+x[0]+"</small><b>"+fmt(x[1])+" مورد</b></article>").join("");
  $("catalog-orders").innerHTML=orders.map(o=>"<tr><td>"+o.id+"</td><td>"+o.title+"</td><td>"+o.owner+" · "+data.byId(o.dept).name+"</td><td>"+o.deadline+"</td><td>"+fmt(o.progress)+"٪</td><td>"+o.status+"</td></tr>").join("");
  const urgent=orders.filter(o=>o.status==="معوق"||o.status==="ابلاغ‌شده").map(o=>o.title+"؛ مخاطب: "+o.owner+"؛ مهلت: "+o.deadline);
  $("catalog-actions").innerHTML=(urgent.length?urgent:["ادامه پایش شاخص‌های کلیدی و ثبت گزارش‌های دوره‌ای"]).map(x=>"<li>"+x+"</li>").join("");
  const groups={all:[],operations:["catalog-departments","catalog-dept-notes","catalog-orders","catalog-order-kpis"],hr:["catalog-hr-kpis","catalog-hr-table"],assets:["catalog-assets"],executive:["catalog-orders","catalog-order-kpis","catalog-actions"]};
  root.querySelectorAll(".catalog-page").forEach(page=>{page.classList.remove("catalog-hide");if(scope!=="all"){const ids=[...page.querySelectorAll("[id]")].map(n=>n.id);const show=groups[scope]||[];if(!ids.some(id=>show.includes(id)))page.classList.add("catalog-hide");}});
 }
 $("catalog-period").addEventListener("change",()=>{const p=$("catalog-period").value;if(p==="month"){$("catalog-from").value="۱۴۰۵/۰۸/۰۱";$("catalog-to").value="۱۴۰۵/۰۸/۳۰";}if(p==="quarter"){$("catalog-from").value="۱۴۰۵/۰۷/۰۱";$("catalog-to").value="۱۴۰۵/۰۹/۳۰";}if(p==="half"){$("catalog-from").value="۱۴۰۵/۰۷/۰۱";$("catalog-to").value="۱۴۰۵/۱۲/۲۹";}if(p==="year"){$("catalog-from").value="۱۴۰۵/۰۱/۰۱";$("catalog-to").value="۱۴۰۵/۱۲/۲۹";}render();});
 $("catalog-generate").addEventListener("click",render);
 $("catalog-scope").addEventListener("change",render);
 $("catalog-print").addEventListener("click",()=>{render();window.print();});
 render();
})();