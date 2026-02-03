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
    } else if (deleting && charIndex >= 0) {
      typingElement.textContent = current.substring(0, charIndex--);
    }

    if (charIndex === current.length + 10) deleting = true;

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeLoop, deleting ? 40 : 80);
  }

  typeLoop();


  /* ==============================
     SMOOTH SCROLL (ANCHORS)
  ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  /* ==============================
     SCROLL REVEAL (SKILLS + PROJECTS)
  ============================== */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".skill-card").forEach(card => {
    observer.observe(card);
  });

  document.querySelectorAll(".project-card").forEach(card => {
    observer.observe(card);
  });


  /* ==============================
     CURSOR GLOW EFFECT
  ============================== */
  const cursor = document.querySelector(".cursor-glow");

  if (cursor) {
    document.addEventListener("mousemove", (e) => {
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
  ============================== */
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h;

    function resizeCanvas() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 60;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(127, 0, 255, 0.4)";
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    }

    drawParticles();
  }


  /* ==============================
     DARK / LIGHT MODE TOGGLE
  ============================== */
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light");

      if (body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙";
      }
    });
  }

});
