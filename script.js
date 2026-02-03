document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     TYPING EFFECT
  ====================== */
  const roles = [
    "Robotics & AI Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines"
  ];

  let i = 0, j = 0, del = false;
  const typing = document.getElementById("typing");

  function loop() {
    if (!typing) return;
    typing.textContent = roles[i].slice(0, j);
    if (!del && j++ === roles[i].length + 8) del = true;
    if (del && --j === 0) { del = false; i = (i+1)%roles.length; }
    setTimeout(loop, del ? 40 : 80);
  }
  loop();

  /* ======================
     CURSOR GLOW
  ====================== */
  const glow = document.querySelector(".cursor-glow");
  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    glow.style.opacity = 1;
  });
  document.addEventListener("mouseleave", () => glow.style.opacity = 0);

  /* ======================
     PARTICLES (BACKGROUND)
  ====================== */
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize);

  const dots = Array.from({length: 60}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    dx:(Math.random()-0.5)*0.3,
    dy:(Math.random()-0.5)*0.3
  }));

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dots.forEach(p=>{
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>canvas.width) p.dx*=-1;
      if(p.y<0||p.y>canvas.height) p.dy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle="rgba(127,0,255,0.5)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();

});
