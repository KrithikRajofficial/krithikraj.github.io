document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     TYPING ANIMATION (HERO)
  ============================== */
  const roles = [
    "Robotics & AI Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typingElement = document.getElementById("typing");

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting && charIndex <= current.length) {
      typingElement.textContent = current.substring(0, charIndex++);
    } 
    else if (deleting && charIndex >= 0) {
      typingElement.textContent = current.substring(0, charIndex--);
    }

    if (charIndex === current.length + 10) deleting = true;

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeLoop, deleting ? 40 : 80);
  }

  if (typingElement) typeLoop();


  /* ==============================
     SMOOTH SCROLL (ANCHORS)
  ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  /* ==============================
     SCROLL REVEAL (SKILLS + PROJECTS)
  ============================== */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".skill-card, .project-card").forEach(el => {
    revealObserver.observe(el);
  });


  /* ==============================
     CURSOR GLOW EFFECT
  ============================== */
  const cursor = document.querySelector(".cursor-glow");

  if (cursor) {
    document.addEventListener("mousemove", e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
    });
  }


  /* ==============================
     PARTICLE BACKGROUND (CANVAS)
     — FIXED (NO BIG SHAPES)
  ============================== */
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  const PARTICLE_COUNT = 70;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(127, 0, 255, 0.45)";
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();

});
