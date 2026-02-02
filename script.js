const roles = [
  "Robotics & AI Engineer",
  "ROS • Computer Vision • Autonomous Systems",
  "Building Intelligent Machines"
];

let roleIndex = 0;
let charIndex = 0;
let typingElement = document.getElementById("typing");
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting && charIndex <= current.length) {
    typingElement.textContent = current.substring(0, charIndex++);
  } 
  else if (deleting && charIndex >= 0) {
    typingElement.textContent = current.substring(0, charIndex--);
  }

  if (charIndex === current.length + 15) deleting = true;
  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeLoop, deleting ? 40 : 80);
}

typeLoop();
