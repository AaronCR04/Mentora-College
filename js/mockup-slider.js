/* ==========================================================================
   MENTORA COLLEGE - MOCKUP SLIDER CONTROLLER
   Slider interactivo y fluido para la visualización de mockups móviles
   ========================================================================== */

export function initMockupSlider() {
  const container = document.getElementById('mockupSliderContainer');
  const track = document.getElementById('mockupSliderTrack');
  const slides = document.querySelectorAll('.mockup-slide');
  const dots = document.querySelectorAll('.mockup-slider-dot');
  const btnPrev = document.getElementById('mockupSliderPrev');
  const btnNext = document.getElementById('mockupSliderNext');

  if (!container || !track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;
  const autoplayInterval = 5000; // 5 segundos

  // Actualizar posición y estado del slider
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Efecto de traslación fluido
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Actualizar dots
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('is-active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('is-active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    // Actualizar accesibilidad de slides
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.setAttribute('aria-hidden', 'false');
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)';
      } else {
        slide.setAttribute('aria-hidden', 'true');
        slide.style.opacity = '0.4';
        slide.style.transform = 'scale(0.96)';
      }
    });
  }

  // Siguiente y anterior
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Event Listeners para botones
  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  // Event Listeners para dots
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(idx);
      startAutoplay();
    });
  });

  // Pausa en hover para una lectura cómoda
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  // Soporte táctil natural (Swipe en móviles/tablets)
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    stopAutoplay();
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 45;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Deslizó hacia la izquierda -> siguiente
        nextSlide();
      } else {
        // Deslizó hacia la derecha -> anterior
        prevSlide();
      }
    }
  }

  // Inicializar primer slide y autoplay
  goToSlide(0);
  startAutoplay();
}
