// Toggle between dark and light theme
function toggleMode() {
  const html = document.documentElement;
  const img = document.querySelector("#profile img");

  html.classList.toggle("light");

  if (html.classList.contains("light")) {
    img.setAttribute("src", "assets/avatar.png");
    img.setAttribute("alt", "Foto de Ryan Santos");
  } else {
    img.setAttribute("src", "assets/avatar-light.png");
    img.setAttribute("alt", "Foto de Ryan Santos");
  }
}

// Add subtle reveal animations while scrolling
function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const elementsToReveal = document.querySelectorAll(
    "#profile, #switch, .links-section, .about-section, .project-card, .skills-section, .contact-section, #social-links, footer"
  );

  if (prefersReducedMotion) {
    elementsToReveal.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  elementsToReveal.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 450)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  requestAnimationFrame(() => {
    elementsToReveal.forEach((element) => {
      observer.observe(element);
    });
  });
}

// Initialize page interactions
setupScrollReveal();