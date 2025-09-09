const quizData = [
  {
    q: "أي مما يلي يُعد شبكة اجتماعية؟",
    options: ["ويكيبيديا", "إنستجرام", "ووردبريس", "بلوجر"],
    answer: 1
  },
  {
    q: "أي خيار يعبّر عن استخدام إيجابي؟",
    options: ["نشر شائعات", "الاحتيال على الآخرين", "التعلم من دورات قصيرة", "التنمّر"],
    answer: 2
  },
  {
    q: "ما أفضل نصيحة للأمان؟",
    options: ["مشاركة كلمة السر مع صديق", "استخدام مصادقة ثنائية", "قبول كل طلبات المتابعة", "نشر الموقع الحالي دائمًا"],
    answer: 1
  }
];

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");

quizData.forEach((item, i)=>{
  const wrap = document.createElement("div");
  wrap.className = "q";
  wrap.innerHTML = `<h3>${i+1}. ${item.q}</h3>
    ${item.options.map((op, idx)=>`
      <label>
        <input type="radio" name="q${i}" value="${idx}"> ${op}
      </label>`).join("")}`;
  quizEl.appendChild(wrap);
});

document.getElementById("submitQuiz").addEventListener("click", ()=>{
  let score = 0;
  quizData.forEach((item, i)=>{
    const checked = document.querySelector(`input[name="q${i}"]:checked`);
    if(checked && Number(checked.value) === item.answer) score++;
  });
  const percent = Math.round((score / quizData.length) * 100);
  resultEl.textContent = `نتيجتك: ${score}/${quizData.length} (${percent}٪)`;
  window.showToast?.(` أحسنت! نتيجتك ${percent}% `);
});

document.getElementById("resetQuiz").addEventListener("click", ()=>{
  document.querySelectorAll("#quiz input[type=radio]").forEach(r=>r.checked=false);
  resultEl.textContent = "";
});
