document.addEventListener("DOMContentLoaded", () => {

  const roles = [
    "Robotics & AI Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines"
  ];

  let i = 0, j = 0, del = false;
  const typing = document.getElementById("typing");

  function typeLoop() {
    const text = roles[i];
    typing.textContent = text.slice(0, j);
    del ? j-- : j++;
    if (j > text.length + 6) del = true;
    if (j === 0 && del) { del = false; i = (i+1)%roles.length; }
    setTimeout(typeLoop, del ? 40 : 80);
  }
  typeLoop();

  const glow = document.querySelector(".cursor-glow");
  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    glow.style.opacity = "1";
  });

  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  });
});
