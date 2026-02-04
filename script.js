// Stars canvas background (simple)
(function(){
  const canvas = document.getElementById('stars');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars=[];

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    initStars();
  }

  function initStars(){
    stars = [];
    const count = Math.round((w*h)/7000);
    for(let i=0;i<count;i++){
      stars.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.2 + 0.3,
        alpha: Math.random()*0.8 + 0.2,
        vx: (Math.random()-0.5)*0.05
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(let s of stars){
      ctx.beginPath();
      ctx.fillStyle = "rgba(200,180,255," + s.alpha + ")";
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
      s.x += s.vx;
      if(s.x<0) s.x = w;
      if(s.x> w) s.x = 0;
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  })
});

// Scroll-to-top
const toTop = document.getElementById('toTop');
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 400) toTop.style.display = 'block';
  else toTop.style.display = 'none';
});

// Theme toggle (simple, keeps dark as default)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', ()=>{
  const body = document.body;
  if(body.classList.contains('light')){
    body.classList.remove('light');
    themeToggle.textContent = '🌙';
  } else {
    body.classList.add('light');
    themeToggle.textContent = '☀️';
  }
});

// small enhancement: highlight current section in nav
const sections = document.querySelectorAll('main, section');
const navLinks = document.querySelectorAll('.nav a:not(.contact-btn)');

function onScroll(){
  let index = sections.length;
  while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
  navLinks.forEach(a => a.classList.remove('active'));
  const id = sections[index].id;
  const link = document.querySelector('.nav a[href="#'+id+'"]');
  if(link) link.classList.add('active');
}
onScroll();
window.addEventListener('scroll', onScroll);
