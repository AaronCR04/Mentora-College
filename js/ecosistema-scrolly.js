/* ==========================================================================
   MENTORA COLLEGE - ECOSISTEMA CONTINUO SCROLLYTELLING CONTROLLER
   Interactive 2-column scroll-driven experience powered by GSAP & ScrollTrigger
   ========================================================================== */

export function initEcosistemaScrolly() {
  const ecosistemaSection = document.getElementById('ecosistema');
  if (!ecosistemaSection) return;

  // Check if GSAP and plugins are available
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const ScrollToPlugin = window.ScrollToPlugin;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (ScrollToPlugin) {
      gsap.registerPlugin(ScrollToPlugin);
    }
  }

  const stepItems = document.querySelectorAll('.ecosistema-step-item');
  const slides = document.querySelectorAll('.ecosistema-slide');
  const totalSteps = stepItems.length;

  if (totalSteps === 0 || slides.length === 0) return;

  let currentActiveIndex = 0;

  // Function to switch active step
  function setActiveStep(index, animateScroll = false) {
    if (index === currentActiveIndex && !animateScroll) return;
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

  // Handle click navigation on any step
  stepItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const scrollTriggerInstance = ScrollTrigger
        ? ScrollTrigger.getById('ecosistema-scroll-trigger')
        : null;

      if (scrollTriggerInstance && window.innerWidth >= 992 && gsap && ScrollToPlugin) {
        const start = scrollTriggerInstance.start;
        const end = scrollTriggerInstance.end;
        // Position scroll within the pinned section
        const targetScroll = start + ((end - start) / (totalSteps - 1)) * idx + 2;
        gsap.to(window, {
          scrollTo: targetScroll,
          duration: 0.65,
          ease: 'power2.inOut'
        });
      } else {
        setActiveStep(idx);
      }
    });
  });

  // Setup GSAP ScrollTrigger if desktop screen
  function setupScrollTrigger() {
    // Kill existing trigger if any
    const existing = ScrollTrigger ? ScrollTrigger.getById('ecosistema-scroll-trigger') : null;
    if (existing) existing.kill();

    if (!gsap || !ScrollTrigger || window.innerWidth < 992) {
      return;
    }

    // Create pinned scrolltrigger
    ScrollTrigger.create({
      id: 'ecosistema-scroll-trigger',
      trigger: '#ecosistema',
      start: 'top top',
      end: '+=3400',
      pin: true,
      anticipatePin: 1,
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        // Map 0 -> 1 to index 0 -> 5
        const stepIndex = Math.min(totalSteps - 1, Math.floor(progress * totalSteps));
        if (stepIndex !== currentActiveIndex) {
          setActiveStep(stepIndex);
        }
      }
    });
  }

  // Initial trigger setup
  setupScrollTrigger();

  // Handle resize debounced
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setupScrollTrigger();
    }, 250);
  });
}
