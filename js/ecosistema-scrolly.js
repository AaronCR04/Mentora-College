/* ==========================================================================
   MENTORA COLLEGE - ECOSISTEMA CONTINUO AUTOPLAY CONTROLLER
   Autoplay carousel (5s loop) & interactive click step selector
   ========================================================================== */

export function initEcosistemaScrolly() {
  const ecosistemaSection = document.getElementById('ecosistema');
  if (!ecosistemaSection) return;

  const gsap = window.gsap;
  const stepItems = document.querySelectorAll('.ecosistema-step-item');
  const slides = document.querySelectorAll('.ecosistema-slide');
  const totalSteps = stepItems.length;

  if (totalSteps === 0 || slides.length === 0) return;

  let currentActiveIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 5000; // 5 segundos

  // Function to switch active step
  function setActiveStep(index) {
    if (index < 0 || index >= totalSteps) return;

    const prevIndex = currentActiveIndex;
    currentActiveIndex = index;

    // 1. Update left stepper classes
    stepItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    // 2. Animate right slides
    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('is-active');
        if (gsap) {
          gsap.killTweensOf(slide);
          gsap.fromTo(
            slide,
            { opacity: 0, y: 24, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
          );
        }
      } else if (idx === prevIndex) {
        slide.classList.remove('is-active');
        if (gsap) {
          gsap.killTweensOf(slide);
          gsap.to(slide, {
            opacity: 0,
            y: -18,
            duration: 0.3,
            ease: 'power2.in'
          });
        }
      } else {
        slide.classList.remove('is-active');
      }
    });
  }

  function nextStep() {
    const nextIndex = (currentActiveIndex + 1) % totalSteps;
    setActiveStep(nextIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextStep, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Handle click navigation on any step
  stepItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      setActiveStep(idx);
      startAutoplay(); // Reinicia el temporizador de 5 segundos
    });
  });

  // Pausar al pasar el cursor sobre la sección para lectura cómoda
  ecosistemaSection.addEventListener('mouseenter', () => {
    stopAutoplay();
  });

  ecosistemaSection.addEventListener('mouseleave', () => {
    startAutoplay();
  });

  // Inicializar primer paso y autoplay
  setActiveStep(0);
  startAutoplay();
}
