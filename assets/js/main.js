// تحديث السنة
document.getElementById("year").textContent = new Date().getFullYear();

// تبديل الثيم (فاتح/داكن/تلقائي)
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyStoredTheme(){
  const t = localStorage.getItem("theme") || "auto";
  document.body.className = `theme-${t}`;
  root.classList.toggle("light", t === "light");
}
applyStoredTheme();

themeToggle?.addEventListener("click", () => {
  const current = localStorage.getItem("theme") || "auto";
  const next = current === "dark" ? "light" : current === "light" ? "auto" : "dark";
  localStorage.setItem("theme", next);
  applyStoredTheme();
});

// مؤثر ظهور للعناصر
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.transform = "translateY(0)";
      e.target.style.opacity = "1";
      observer.unobserve(e.target);
    }
  })
},{threshold:.12});

document.querySelectorAll(".card").forEach(el=>{
  el.style.transform = "translateY(12px)";
  el.style.opacity = ".001";
  el.style.transition = "transform .4s ease, opacity .4s ease";
  observer.observe(el);
});
