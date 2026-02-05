/* Simple starfield canvas + small anims + theme toggle + smooth scroll + mouse glow */
(() => {
  // STARFIELD
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const num = Math.floor((W * H) / 20000);
  const stars = [];

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function initStars(){
    stars.length = 0;
    for(let i=0;i<num;i++){
      stars.push({
        x: Math.random()*W,
        y: Math.random()*H,
        z: Math.random()*1,
        r: rand(0.4,1.8),
        vx: rand(-0.02,0.02),
        vy: rand(-0.01,0.01)
      });
    }
  }
  initStars();

  function resize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    initStars();
  }
  addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,W,H);
    // subtle radial gradient background
    const g = ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0, 'rgba(3,7,20,0.85)');
    g.addColorStop(1, 'rgba(2,15,28,0.9)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    for(const s of stars){
      s.x += s.vx;
      s.y += s.vy;
      if(s.x < 0) s.x = W;
      if(s.x > W) s.x = 0;
      if(s.y < 0) s.y = H;
      if(s.y > H) s.y = 0;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(150,190,255,' + (0.4 + s.z*0.6) + ')';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();

  // MOUSE GLOW follows cursor
  const glow = document.getElementById('mouse-glow');
  document.addEventListener('mousemove', e => {
    const x = e.clientX;
    const y = e.clientY;
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
  });

  // THEME toggle (simple: light/dark css changes via variables)
  const toggle = document.getElementById('theme-toggle');
  let dark = true;
  toggle.addEventListener('click', () => {
    dark = !dark;
    if(!dark){
      // light-ish variant
      document.documentElement.style.setProperty('--bg-1', '#f6f7fb');
      document.documentElement.style.setProperty('--bg-2', '#eef2f8');
      document.documentElement.style.setProperty('--text', '#0a0d12');
      document.documentElement.style.setProperty('--muted', '#4a5568');
      document.documentElement.style.setProperty('--card-bg', 'rgba(255,255,255,0.85)');
      document.documentElement.style.setProperty('--glass-border', 'rgba(0,0,0,0.06)');
      toggle.textContent = '☀️';
    } else {
      // restore dark
      document.documentElement.style.setProperty('--bg-1', '#06060a');
      document.documentElement.style.setProperty('--bg-2', '#071022');
      document.documentElement.style.setProperty('--text', '#e8eef6');
      document.documentElement.style.setProperty('--muted', '#9aa5b1');
      document.documentElement.style.setProperty('--card-bg', 'rgba(255,255,255,0.04)');
      document.documentElement.style.setProperty('--glass-border', 'rgba(255,255,255,0.06)');
      toggle.textContent = '🌙';
    }
  });

  // smooth scroll for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (ev)=>{
      const href = a.getAttribute('href');
      if(href === '#') return;
      const el = document.querySelector(href);
      if(el){
        ev.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // tiny idle shimmer on role-pill: it's in CSS animation "blink" set already.

  // Add small parallax of hero right column based on scroll
  const heroRight = document.querySelector('.hero-right');
  window.addEventListener('scroll', ()=>{
    const offset = window.scrollY;
    if(heroRight){
      heroRight.style.transform = `translateY(${Math.min(offset * 0.06, 20)}px)`;
    }
  });

  // Ensure last-updated uses the given date (we already hard-coded text in HTML).
})();
