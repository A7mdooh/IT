<script>
// ====== Toast احتياطي (لو مشغّل ui.js فهو سيستخدمه) ======
window.showToast = window.showToast || ((msg, ms=2200)=>{
  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.innerHTML = msg; t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=> t.classList.remove("show"), ms);
});

// ====== مؤثرات صوتية (نجاح/خطأ) بلا ملفات صوتية ======
const SFX = (()=> {
  let ctx=null;
  const ensure=()=>{ if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)(); };
  const beep=(f=880,d=0.12,type="sine",g=0.05)=>{ if(!ctx) return; const o=ctx.createOscillator(), gn=ctx.createGain();
    o.type=type; o.frequency.value=f; gn.gain.value=g; o.connect(gn).connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime+d);
  };
  return {
    init(){ ensure(); },
    ok(){ ensure(); [0,0.12,0.24].forEach((t,i)=> setTimeout(()=>beep(660+220*i,0.09,"sine",0.06), t*1000)); },
    bad(){ ensure(); [0,0.09].forEach((t,i)=> setTimeout(()=>beep(220-40*i,0.12,"square",0.06), t*1000)); },
  }
})();

// ====== نقاط موحّدة عبر الموقع ======
const Points = (()=>{
  const KEY="site_points_v1";
  let pts = Number(localStorage.getItem(KEY)||0);
  const subs = new Set();
  function set(v){ pts=Math.max(0, v); localStorage.setItem(KEY, pts); subs.forEach(fn=>fn(pts)); }
  return {
    get(){ return pts; },
    add(n, toastMsg){
      set(pts + Number(n||0));
      if(toastMsg!==false){ showToast(`+${n} نقطة 🎉`); }
      try{ SFX.ok(); }catch{}
    },
    use(n){ if(pts>=n){ set(pts-n); return true; } return false; },
    onChange(fn){ subs.add(fn); fn(pts); }
  };
})();

// ====== شارة النقاط في الشريط العلوي ======
function insertPointsBadge(){
  const host = document.querySelector(".topbar .container") || document.body;
  let box = document.getElementById("pointsBadge");
  if(!box){
    box = document.createElement("div");
    box.id = "pointsBadge";
    box.className = "points-badge";
    box.innerHTML = `⭐ <span id="pointsNum">0</span>`;
    host.appendChild(box);
  }
  Points.onChange(v=> { const n=document.getElementById("pointsNum"); if(n) n.textContent=v; });
}

// فعّل الصوت في أول تفاعل
document.addEventListener("pointerdown", ()=> SFX.init(), { once:true });
</script>
