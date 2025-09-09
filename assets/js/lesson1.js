// ——— بيانات الاختبار ———
const quizData = [
  { q: "أي مما يلي يُعد شبكة اجتماعية؟", options: ["ويكيبيديا", "إنستجرام", "ووردبريس", "بلوجر"], answer: 1 },
  { q: "اختَر استخدامًا إيجابيًا:", options: ["نشر شائعات", "التنمّر", "التعلّم من مقاطع قصيرة", "انتهاك خصوصية الآخرين"], answer: 2 },
  { q: "أفضل ممارسة للأمان:", options: ["مشاركة كلمة السر مع صديق", "استخدام 2FA", "قبول كل طلبات المتابعة", "موقعك دائمًا عام"], answer: 1 },
  { q: "أيها مثال لمدونة؟", options: ["بلوجر/ووردبريس", "إنستجرام", "واتساب", "تيك توك"], answer: 0 },
  { q: "الويكي تتميّز بـ:", options: ["منشورات عشوائية", "تحرير تعاوني وتوثيق", "رسائل خاصة فقط", "بث مباشر فقط"], answer: 1 },
  { q: "قبل مشاركة خبر:", options: ["أشارك فورًا", "أتحقق من المصدر والمصداقية", "أضيف موقع المدرسة", "أذكر أرقام هواتف"], answer: 1 }
];

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");

// بناء عناصر الاختبار
quizData.forEach((item, i)=>{
  const wrap = document.createElement("div");
  wrap.className = "q";
  wrap.innerHTML = `<h3>${i+1}. ${item.q}</h3>
    ${item.options.map((op, idx)=>`
      <label style="display:block;margin:6px 0;cursor:pointer">
        <input type="radio" name="q${i}" value="${idx}"> ${op}
      </label>`).join("")}`;
  quizEl.appendChild(wrap);
});

// تصحيح ملوّن + حفظ محلي
document.getElementById("submitQuiz").addEventListener("click", ()=>{
  let score = 0;
  quizData.forEach((item, i)=>{
    const radios = [...document.querySelectorAll(`input[name="q${i}"]`)];
    const picked = radios.find(r=>r.checked);
    radios.forEach(r=> r.parentElement.style.color = "inherit");
    if(picked){
      if(Number(picked.value) === item.answer){
        score++;
        picked.parentElement.style.color = "limegreen";
      }else{
        picked.parentElement.style.color = "crimson";
        radios[item.answer].parentElement.style.color = "limegreen";
      }
    }else{
      radios[item.answer].parentElement.style.color = "limegreen";
    }
  });
  const percent = Math.round((score / quizData.length) * 100);
  resultEl.textContent = `نتيجتك: ${score}/${quizData.length} (${percent}٪)`;
  localStorage.setItem("lesson1_score", String(percent));
  window.showToast?.(` أحسنت! نتيجتك ${percent}% `);
});

document.getElementById("resetQuiz").addEventListener("click", ()=>{
  document.querySelectorAll("#quiz input[type=radio]").forEach(r=>r.checked=false);
  resultEl.textContent = "";
  document.querySelectorAll("#quiz label").forEach(l=> l.style.color="inherit");
});

// نشاط المنشو‌ر: قرار الأمان
document.getElementById("checkPost")?.addEventListener("click", ()=>{
  const val = document.querySelector('input[name="postSafe"]:checked')?.value;
  const out = document.getElementById("postResult");
  if(!val){ out.textContent = "اختر أولًا."; return; }
  if(val === "unsafe"){
    out.textContent = "صحيح: المنشور يكشف وقتًا ومكانًا محدّدين—خطر على الخصوصية.";
    out.style.color = "limegreen";
  }else{
    out.textContent = "تنبيه: نشر تفاصيل زمن/مكان فعالية مدرسية قد يعرّض الطلاب للخطر.";
    out.style.color = "crimson";
  }
});

// اختيار المنصات (تمهيد)
document.getElementById("platformPicker")?.addEventListener("click",(e)=>{
  if(e.target.classList.contains("chip")){
    e.target.classList.toggle("active");
    const picked = [...document.querySelectorAll("#platformPicker .chip.active")].map(c=>c.textContent.trim());
    localStorage.setItem("lesson1_platforms", JSON.stringify(picked));
  }
});

// حفظ التأمل
document.getElementById("saveReflection")?.addEventListener("click", ()=>{
  const txt = document.getElementById("reflectionText").value.trim();
  if(!txt){ window.showToast?.("اكتب سطرًا واحدًا على الأقل"); return; }
  localStorage.setItem("lesson1_reflection", txt);
  document.getElementById("saveStatus").textContent = "تم الحفظ محليًا ✓";
});

// سنة التذييل
document.getElementById("year").textContent = new Date().getFullYear();
