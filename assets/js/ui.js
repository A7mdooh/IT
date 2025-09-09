// توست بسيط
(function(){
  const style = document.createElement("style");
  style.textContent = `
  .toast{position:fixed; inset-inline:50%; transform:translateX(-50%); bottom:20px;
    background:var(--card); color:var(--text); border:1px solid rgba(255,255,255,.14);
    padding:.6rem 1rem; border-radius:12px; box-shadow:var(--shadow); z-index:9999; opacity:0; transition:opacity .2s ease}
  .toast.show{opacity:1}`;
  document.head.appendChild(style);

  let t;
  window.showToast = (msg)=>{
    clearTimeout(t);
    let el = document.querySelector(".toast");
    if(!el){
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    t = setTimeout(()=> el.classList.remove("show"), 2200);
  }
})();
