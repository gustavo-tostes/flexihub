/* =========================
   Flexihub — micro.js
   Reveal + micro interações
   ========================= */

(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1) Reveal on scroll (sem editar HTML)
  const revealTargets = document.querySelectorAll(
    ".panel, .card, .step, .ai-preview, .form-card, footer, .crumbs, h1, .lead, .grid"
  );

  revealTargets.forEach(el => el.classList.add("reveal"));

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Pulse só em cards “decisão final”
          if (entry.target.classList.contains("decision")) {
            entry.target.classList.add("fx-pulse");
          }

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
  } else {
    // fallback simples
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
  }

  // 2) Botões de cenário: estado ativo
  const scenarioBtns = document.querySelectorAll(".scenario-btn");
  if (scenarioBtns.length) {
    scenarioBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        scenarioBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  }
})();
