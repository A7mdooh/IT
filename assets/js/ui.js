// ثيم (فاتح/داكن)
(function(){
  const root = document.documentElement;
  const key = "theme";
  const apply = (t)=>{ root.classList.toggle("dark", t==="dark"); localStorage.setItem(key, t); };
  apply(localStorage.getItem(key)||"light");
  document.addEventListener("click", (e)=>{
    const btn = e.target.closest("#themeToggle");
    if(!btn) return;
    const cur = localStorage.getItem(key)||"light";
    apply(cur==="dark"?"light":"dark");
    showToast(cur==="dark"?"تم التحويل إلى الوضع الفاتح":"تم تفعيل الوضع الليلي");
  });
})();

// إشعار بسيط
window.showToast = (msg, ms=2600)=>{
  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.innerHTML = msg; t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=> t.classList.remove("show"), ms);
};
