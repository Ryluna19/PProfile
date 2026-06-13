// Aplica o tema claro ou escuro na página
function applyTheme(isLight) {
  const html = document.documentElement;
  const switchButton = document.querySelector("#switch button");

  html.classList.toggle("light", isLight);

  if (switchButton) {
    switchButton.setAttribute("aria-pressed", String(isLight));
  }

  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Alterna o tema ao clicar no switch
function toggleMode() {
  const html = document.documentElement;
  const isLight = !html.classList.contains("light");

  applyTheme(isLight);
}

// Carrega o tema salvo no navegador
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    applyTheme(true);
  }

  if (savedTheme === "dark") {
    applyTheme(false);
  }
}

// Faz o menu navegar suavemente até cada seção
function setupSmoothNavigation() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

// Adiciona animação de entrada durante a rolagem
function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const elementsToReveal = document.querySelectorAll(
    [
      "#profile",
      "#switch",
      ".highlights-section",
      ".about-section",
      ".goal-section",
      ".technical-summary-section",
      ".technical-card",
      ".contribution-section",
      ".contribution-card",
      ".section-header",
      ".project-card",
      ".skills-section",
      ".skills-group",
      ".contact-section",
      "footer"
    ].join(", ")
  );

  if (prefersReducedMotion) {
    elementsToReveal.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  elementsToReveal.forEach((element, index) => {
    element.classList.add("scroll-reveal");
    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index * 80, 420)}ms`
    );
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  elementsToReveal.forEach((element) => {
    observer.observe(element);
  });
}

// Permite que o onclick do HTML encontre a função toggleMode
window.toggleMode = toggleMode;

// Inicializa as funções quando a página termina de carregar
document.addEventListener("DOMContentLoaded", () => {
  loadSavedTheme();
  setupSmoothNavigation();
  setupScrollReveal();
});