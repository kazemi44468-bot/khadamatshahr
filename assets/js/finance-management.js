(()=>{'use strict';
const K='shahrbehesht.finance.v1';
const N={'1':'اداری و پشتیبانی','2':'تحقیق و توسعه','3':'پارکبان و معبربانان','4':'تأسیسات فنی و نگهداری','6':'فاوا و خدمات فنی','7':'جمع‌آوری و بازیافت پسماند',company:'ستاد شرکت'};
const f=n=>new Intl.NumberFormat('fa-IR').format(n);
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let a=[];try{a=JSON.parse(localStorage.getItem(K)||'[]')}catch{}
const form=document.getElementById('finance-form'),rows=document.getElementById('finance-rows');
function render(){
 const sum=type=>a.filter(x=>x.type===type).reduce((s,x)=>s+(+x.amount||0),0);
 document.getElementById('finance-approved').textContent=f(sum('اعتبار مصوب'));
 document.getElementById('finance-allocated').textContent=f(sum('اعتبار تخصیص‌یافته'));
 document.getElementById('finance-total').textContent=f(a.filter(x=>['هزینه و خرید','فاکتور','اضافه‌کاری','کارانه','تصادف و خسارت'].includes(x.type)).reduce((s,x)=>s+(+x.amount||0),0));
 document.getElementById('finance-open').textContent=f(a.filter(x=>!['پرداخت‌شده','تسویه‌شده'].includes(x.status)).length);
 const sums=Object.keys(N).map(k=>({name:N[k],value:a.filter(x=>x.dept===k&&['هزینه و خرید','فاکتور','اضافه‌کاری','کارانه','تصادف و خسارت'].includes(x.type)).reduce((s,x)=>s+(+x.amount||0),0)})).filter(x=>x.value>0);
 const max=Math.max(1,...sums.map(x=>x.value));
 document.getElementById('finance-dept-bars').innerHTML=sums.length?sums.map(x=>'<div class="finance-bar-row"><div><b>'+e(x.name)+'</b><strong>'+f(x.value)+' تومان</strong></div><i><span style="width:'+Math.round(x.value/max*100)+'%"></span></i></div>').join(''):'<p>با ثبت رویدادهای مالی، مقایسه ادارات نمایش داده می‌شود.</p>';
 rows.innerHTML=a.length?a.slice().reverse().map(x=>'<tr><td>'+e(N[x.dept])+'</td><td>'+e(x.type)+'</td><td>'+e(x.title)+'</td><td>'+f(+x.amount||0)+'</td><td>'+e(x.status)+'</td><td>'+e(x.date||'—')+'</td></tr>').join(''):'<tr><td colspan="6">هنوز رویداد مالی ثبت نشده است.</td></tr>';
}
form.addEventListener('submit',ev=>{ev.preventDefault();const x=Object.fromEntries(new FormData(form).entries());x.id=Date.now();x.amount=String(x.amount).replace(/[,٬\\s]/g,'');x.date=x.date||new Intl.DateTimeFormat('fa-IR').format(new Date());a.push(x);localStorage.setItem(K,JSON.stringify(a));form.reset();render()});
document.getElementById('finance-print').addEventListener('click',()=>window.print());render();
})();