// Aplica o tema claro ou escuro
function applyTheme(isLight) {
  const html = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const profileImage = document.querySelector("#profile img");

  html.classList.toggle("light", isLight);

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isLight));
  }

  // Tema claro usa avatar.png; tema escuro usa avatar-light.png
  if (profileImage) {
    profileImage.setAttribute(
      "src",
      isLight ? "assets/avatar.png" : "assets/avatar-light.png"
    );
  }

  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Alterna o tema ao clicar no botão
function toggleMode() {
  const isLight = !document.documentElement.classList.contains("light");

  applyTheme(isLight);
}

// Carrega o tema salvo no navegador
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    applyTheme(true);
    return;
  }

  applyTheme(false);
}

// Controla a velocidade do scroll manualmente
function smoothScrollTo(targetPosition, duration = 900) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  // Curva de aceleração/desaceleração para o movimento não ficar seco
  function easeInOutCubic(progress) {
    if (progress < 0.5) {
      return 4 * progress * progress * progress;
    }

    return 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  function animation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Faz os links do menu descerem suavemente até cada seção
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

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const extraSpace = 18;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        extraSpace;

      smoothScrollTo(targetPosition, 950);
    });
  });
}

// Adiciona animação de entrada durante a rolagem
function setupScrollReveal() {
  const elementsToReveal = document.querySelectorAll(
    [
      "#profile",
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

  elementsToReveal.forEach((element, index) => {
    element.classList.add("scroll-reveal");

    // Delay menor para não parecer que a página está “travando”
    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index * 30, 150)}ms`
    );
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Anima apenas uma vez por carregamento para não ficar irritante
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elementsToReveal.forEach((element) => {
    observer.observe(element);
  });
}

// Copia o email para a área de transferência
async function copyEmail() {
  const email = "ryan.bulhoes@gmail.com";
  const feedback = document.querySelector("#copy-feedback");

  try {
    await navigator.clipboard.writeText(email);

    if (feedback) {
      feedback.textContent = "Email copiado!";
    }
  } catch (error) {
    if (feedback) {
      feedback.textContent =
        "Não foi possível copiar automaticamente. Copie o email acima.";
    }
  }

  setTimeout(() => {
    if (feedback) {
      feedback.textContent = "";
    }
  }, 2500);
}

// Permite que o onclick do HTML encontre as funções
window.toggleMode = toggleMode;
window.copyEmail = copyEmail;

// Inicializa tudo quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  loadSavedTheme();
  setupSmoothNavigation();
  setupScrollReveal();
});