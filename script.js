// Keeping your particle engine but adding a subtle "parallax" to cards
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.project-card, .skill-card');
  const x = (window.innerWidth / 2 - e.pageX) / 50;
  const y = (window.innerHeight / 2 - e.pageY) / 50;
  
  cards.forEach(card => {
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
});

// Smooth scroll for Nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// (Include your existing Canvas/Particle code here to keep the background)
