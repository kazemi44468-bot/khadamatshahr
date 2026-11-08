(()=>{'use strict';
const KEY='shahrbehesht.finance.v2';
const DEPTS={'1':'اداری و پشتیبانی','2':'تحقیق و توسعه','3':'پارک‌بان و معبربانان','4':'تأسیسات فنی و نگهداری','6':'فاوا و خدمات فنی','7':'جمع‌آوری، نگهداری و بازیافت پسماند','8':'بازرسی و تحقیقات محلی'};
const TYPES={approved:'اعتبار مصوب',allocated:'اعتبار تخصیص‌یافته',expense:'هزینه عمومی / عملیاتی',overtime:'اضافه‌کاری',performance:'کارانه',allowance:'فوق‌العاده و مزایا',invoice:'فاکتور خرید / خدمات',fuel:'سوخت و انرژی',purchase:'خرید و تدارکات',damage:'خسارت و حوادث',contract:'قرارداد و تعهدات',other:'سایر هزینه‌ها'};
const CATS={personnel:'نیروی انسانی',operations:'عملیات و خدمات شهری',fuel:'سوخت و انرژی',procurement:'خرید و تدارکات',maintenance:'تعمیرات و نگهداری',damages:'خسارت و حوادث',contracts:'قراردادها و پیمانکاران',welfare:'رفاه و پشتیبانی',technology:'فناوری و ارتباطات',other:'سایر'};
const COST_TYPES=['expense','overtime','performance','allowance','invoice','fuel','purchase','damage','contract','other'];
const $=id=>document.getElementById(id),fmt=n=>Math.round(Number(n)||0).toLocaleString('fa-IR'),pct=(a,b)=>b>0?Math.round(a/b*100):0,esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let records=[];
try{
 const saved=JSON.parse(localStorage.getItem(KEY)||'null');
 if(Array.isArray(saved))records=saved;
 else{
  const legacy=JSON.parse(localStorage.getItem('shahrbehesht.finance.v1')||'[]');
  const map={'اعتبار مصوب':'approved','اعتبار تخصیصی':'allocated','اعتبار تخصیص‌یافته':'allocated','هزینه و خرید':'expense','فاکتور':'invoice','اضافه‌کاری':'overtime','کارانه':'performance','تصادف و خسارت':'damage','قرارداد و تعهد':'contract'};
  records=Array.isArray(legacy)?legacy.map(x=>({id:String(x.id||Date.now()),dept:String(x.dept||'company'),type:map[x.type]||'other',category:'operations',title:x.title||'رویداد مالی منتقل‌شده',amount:Number(String(x.amount||0).replace(/[^0-9.]/g,'')),status:x.status||'ثبت اولیه',date:x.date||'',reference:'',note:x.note||'',documented:false})):[]; 
 }
}catch{records=[]}
// Remove only previously generated demo rows and obsolete non-operational categories; preserve user-entered records.
records=records.filter(x=>!String(x.id||'').startsWith('demo-')&&!['capacity','received'].includes(x.type));
function persist(){localStorage.setItem(KEY,JSON.stringify(records))}
persist();
const sum=fn=>records.filter(fn).reduce((s,x)=>s+(Number(x.amount)||0),0);
const costs=()=>records.filter(x=>COST_TYPES.includes(x.type));
const spent=()=>costs().reduce((s,x)=>s+(Number(x.amount)||0),0);
function donut(items,totalValue,label){
 const palette=['#52738b','#91a7b7','#c2cdd5','#a58d78','#718b9d','#b6a39a','#9ba9a8','#cfb98e'];
 let offset=0;const segments=items.filter(x=>x.value>0).map((x,i)=>{const start=offset;offset+=x.value/Math.max(totalValue,1)*100;return palette[i%palette.length]+' '+start+'% '+offset+'%'});
 return '<div class="finance-donut-layout"><div class="finance-donut" style="background:conic-gradient('+(segments.length?segments.join(','):'#e8edf0 0 100%')+')"><div><b>'+fmt(totalValue)+'</b><small>'+label+'</small></div></div><div class="finance-donut-legend">'+items.map((x,i)=>'<div><i style="background:'+palette[i%palette.length]+'"></i><span>'+esc(x.name)+'</span><b>'+fmt(x.value)+' تومان</b><small>'+fmt(pct(x.value,totalValue))+'٪</small></div>').join('')+'</div></div>';
}
function render(){
 const approved=sum(x=>x.type==='approved'&&x.dept==='company');
 const allocated=sum(x=>x.type==='allocated');
 const expense=spent();
 const balance=allocated-expense;
 [['f-approved',approved],['f-allocated',allocated],['f-spent',expense],['f-balance',balance]].forEach(([id,v])=>$(id).textContent=fmt(v));
 const ratios=[
  {label:'درصد تخصیص از اعتبار مصوب',value:pct(allocated,approved),amount:allocated,base:approved,color:'allocation'},
  {label:'درصد هزینه‌کرد از اعتبار تخصیص‌یافته',value:pct(expense,allocated),amount:expense,base:allocated,color:'spending'},
  {label:'درصد هزینه‌کرد از اعتبار مصوب',value:pct(expense,approved),amount:expense,base:approved,color:'approved'}
 ];
 $('finance-ratios').innerHTML=ratios.map(x=>'<article class="finance-ratio-card"><div><small>'+x.label+'</small><b>'+fmt(x.value)+'٪</b></div><div class="finance-ratio-track"><i class="'+x.color+'" style="width:'+Math.min(100,Math.max(0,x.value))+'%"></i></div><span>'+fmt(x.amount)+' از '+fmt(x.base)+' تومان</span></article>').join('');
 const alerts=[];
 if(allocated>approved&&approved>0)alerts.push('مجموع تخصیص از اعتبار مصوب بیشتر است.');
 if(expense>allocated)alerts.push('هزینه‌کرد از مجموع اعتبار تخصیص‌یافته بیشتر است.');
 if(approved===0&&allocated>0)alerts.push('برای تخصیص‌های ثبت‌شده، هنوز اعتبار مصوب کل شرکت ثبت نشده است.');
 $('finance-alerts').innerHTML=alerts.length?'<div class="finance-alert">'+alerts.map(esc).join(' ')+'</div>':'';
 const deptRows=Object.entries(DEPTS).map(([id,name])=>{
  const allocation=sum(x=>x.type==='allocated'&&x.dept===id);
  const cost=sum(x=>COST_TYPES.includes(x.type)&&x.dept===id);
  const documented=sum(x=>COST_TYPES.includes(x.type)&&x.dept===id&&x.documented);
  return{id,name,allocation,cost,documented,share:pct(cost,expense),use:pct(cost,allocation),doc:pct(documented,cost)};
 });
 const max=Math.max(1,...deptRows.flatMap(x=>[x.allocation,x.cost]));
 $('finance-dept-chart').innerHTML=deptRows.map(d=>'<div class="finance-dept-row"><div class="finance-dept-label"><b>'+esc(d.name)+'</b><span>تخصیص: '+fmt(d.allocation)+' تومان · هزینه: '+fmt(d.cost)+' تومان</span></div><div class="finance-dept-bars"><div class="finance-bar-line"><small>تخصیص</small><div><i class="allocation" style="width:'+d.allocation/max*100+'%"></i></div></div><div class="finance-bar-line"><small>هزینه‌کرد</small><div><i class="spending" style="width:'+d.cost/max*100+'%"></i></div></div></div></div>').join('');
 const allocationShares=deptRows.map(x=>({name:x.name,value:x.allocation}));
 const spendingShares=deptRows.map(x=>({name:x.name,value:x.cost}));
 $('finance-allocation-share').innerHTML=donut(allocationShares,allocated,'کل تخصیص');
 $('finance-spending-share').innerHTML=donut(spendingShares,expense,'کل هزینه‌کرد');
 const catRows=Object.entries(CATS).map(([id,name])=>({name,value:sum(x=>COST_TYPES.includes(x.type)&&x.category===id)})).filter(x=>x.value>0);
 $('finance-category-chart').innerHTML=donut(catRows,expense,'هزینه‌ها');
 const docs=sum(x=>COST_TYPES.includes(x.type)&&x.documented);
 const invoices=records.filter(x=>x.type==='invoice'),invoiceSum=invoices.reduce((s,x)=>s+(+x.amount||0),0);
 const settled=invoices.filter(x=>x.status==='تسویه‌شده').reduce((s,x)=>s+(+x.amount||0),0);
 const paid=sum(x=>COST_TYPES.includes(x.type)&&['پرداخت‌شده','تسویه‌شده'].includes(x.status));
 const docCards=[['مبلغ دارای مستند',docs,pct(docs,expense)+'٪ از کل هزینه'],['هزینه بدون مستند',Math.max(0,expense-docs),'نیازمند تکمیل سند'],['مبلغ کل فاکتورها',invoiceSum,invoices.length.toLocaleString('fa-IR')+' فاکتور'],['فاکتورهای تسویه‌شده',settled,'از مجموع فاکتورهای ثبت‌شده'],['مبلغ پرداخت / تسویه هزینه‌ها',paid,pct(paid,expense)+'٪ از هزینه‌ها']];
 $('finance-documents').innerHTML=docCards.map(x=>'<article><small>'+x[0]+'</small><b>'+fmt(x[1])+' تومان</b><span>'+x[2]+'</span></article>').join('');
 const personnel=[['اضافه‌کاری',sum(x=>x.type==='overtime')],['کارانه',sum(x=>x.type==='performance')],['فوق‌العاده و مزایا',sum(x=>x.type==='allowance')]];
 $('finance-personnel-costs').innerHTML=personnel.map(x=>'<article><small>'+x[0]+'</small><b>'+fmt(x[1])+' تومان</b><span>سهم از هزینه کل: '+fmt(pct(x[1],expense))+'٪</span></article>').join('');
 $('finance-dept-rows').innerHTML=deptRows.map(d=>'<tr><td>'+esc(d.name)+'</td><td>'+fmt(d.allocation)+'</td><td>'+fmt(d.cost)+'</td><td>'+fmt(d.share)+'٪</td><td>'+fmt(d.use)+'٪</td><td>'+fmt(d.documented)+'</td><td>'+fmt(d.doc)+'٪</td></tr>').join('')+'<tr class="finance-total-row"><th>مجموع شرکت</th><th>'+fmt(allocated)+'</th><th>'+fmt(expense)+'</th><th>۱۰۰٪</th><th>'+fmt(pct(expense,allocated))+'٪</th><th>'+fmt(docs)+'</th><th>'+fmt(pct(docs,expense))+'٪</th></tr>';
 $('finance-count').textContent=fmt(records.length)+' رویداد';
 $('finance-rows').innerHTML=records.length?records.slice().reverse().map((x,i)=>'<tr><td>'+fmt(records.length-i)+'</td><td>'+esc(x.dept==='company'?'ستاد / کل شرکت':DEPTS[x.dept]||'—')+'</td><td>'+esc(TYPES[x.type]||x.type)+'</td><td>'+esc(x.title)+'</td><td>'+fmt(x.amount)+'</td><td>'+esc(x.status)+'</td><td>'+(x.documented?'دارد':'ندارد')+'</td><td>'+esc(x.date||'—')+'</td><td><button type="button" class="finance-delete" data-delete="'+esc(x.id)+'">حذف</button></td></tr>').join(''):'<tr><td colspan="9" class="finance-empty">هنوز رویداد مالی ثبت نشده است.</td></tr>';
}
const form=$('finance-form');
form.addEventListener('submit',ev=>{
 ev.preventDefault();const x=Object.fromEntries(new FormData(form).entries());x.id=String(Date.now())+'-'+Math.random().toString(36).slice(2,7);x.amount=Number(x.amount);x.documented=form.elements.documented.checked;x.date=x.date||new Intl.DateTimeFormat('fa-IR').format(new Date());
 if(x.type==='approved'&&x.dept!=='company'){alert('اعتبار مصوب کل شرکت باید فقط یک‌بار با انتخاب «ستاد / کل شرکت» ثبت شود.');return}
 if(x.type==='allocated'&&x.dept==='company'){alert('تخصیص اعتبار باید به نام اداره مقصد ثبت شود؛ تخصیص ستادی را به‌عنوان اعتبار مصوب ثبت نکنید.');return}
 if(x.type==='approved'&&records.some(r=>r.type==='approved'&&r.dept==='company')){alert('اعتبار مصوب کل شرکت قبلاً ثبت شده است. برای اصلاح مبلغ، ابتدا ردیف قبلی را از دفتر رویدادها حذف و سپس مبلغ صحیح را ثبت کنید.');return}
 const duplicate=records.some(r=>COST_TYPES.includes(x.type)&&COST_TYPES.includes(r.type)&&r.dept===x.dept&&Number(r.amount)===x.amount&&String(r.title||'').trim()===String(x.title||'').trim()&&String(r.date||'')===String(x.date||'')&&String(r.reference||'')===String(x.reference||''));
 if(duplicate){alert('رویدادی با همین اداره، مبلغ، شرح، تاریخ و شماره سند قبلاً ثبت شده است؛ برای جلوگیری از دوباره‌شماری، ثبت تکراری انجام نشد.');return}
 if(['overtime','performance','allowance'].includes(x.type))x.category='personnel';
 if(x.type==='fuel')x.category='fuel';if(x.type==='purchase')x.category='procurement';if(x.type==='damage')x.category='damages';if(x.type==='contract')x.category='contracts';
 records.push(x);try{persist();form.reset();render()}catch{alert('ذخیره اطلاعات در مرورگر ممکن نشد. فضای ذخیره‌سازی را بررسی کنید.')}
});
$('finance-rows').addEventListener('click',ev=>{const b=ev.target.closest('[data-delete]');if(!b)return;if(!confirm('این رویداد مالی حذف شود؟'))return;records=records.filter(x=>String(x.id)!==b.dataset.delete);persist();render()});
$('finance-print').addEventListener('click',()=>window.print());
render();
})();