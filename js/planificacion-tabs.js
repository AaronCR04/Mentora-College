/**
 * planificacion-tabs.js
 * Control interactivo para el slider de Planificación por Competencias (2 slides)
 * Sincronizado con las tarjetas interactivas de la izquierda y controles del slider.
 */

export function initPlanificacionTabs() {
  const container = document.getElementById('planSliderContainer');
  const track = document.getElementById('planSliderTrack');
  const slides = document.querySelectorAll('.plan-slide');
  const pills = document.querySelectorAll('#planSliderDots .docente-slider-pill');
  const btnPrev = document.getElementById('planSliderPrev');
  const btnNext = document.getElementById('planSliderNext');
  const captionEl = document.getElementById('planMockupCaption');
  const cards = document.querySelectorAll('.js-plan-card');

  if (!container || !track || slides.length === 0) {
    return;
  }

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;
  const autoplayInterval = 6000;

  const captions = [
    "<strong style='color: var(--text-main);'>Planificación de Unidades y Sesiones:</strong> Estructura unidades didácticas y sesiones relacionando directamente al currículo institucional.",
    "<strong style='color: var(--text-main);'>Asignar Competencias:</strong> Vincula las competencias y capacidades oficiales del currículo institucional a cada sesión."
  ];

  function updateCaption(text) {
    if (!captionEl || !text) return;
    captionEl.classList.add('is-changing');
    setTimeout(() => {
      captionEl.innerHTML = text;
      captionEl.classList.remove('is-changing');
    }, 150);
  }

  function goToSlide(index, _fromUser = false) {
    if (totalSlides === 0 || !track) return;

    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Desplazamiento horizontal fluido
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Actualizar pills
    pills.forEach((pill, i) => {
      const isActive = i === currentIndex;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Actualizar visibilidad de slides
    slides.forEach((slide, i) => {
      const isActive = i === currentIndex;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.style.opacity = isActive ? '1' : '0.35';
      slide.style.transform = isActive ? 'scale(1)' : 'scale(0.96)';
    });

    // Sincronizar tarjetas de la columna izquierda
    cards.forEach((card) => {
      const cardSlide = parseInt(card.getAttribute('data-slide'), 10);
      const isCardActive = cardSlide === currentIndex;
      card.classList.toggle('is-active', isCardActive);
      card.setAttribute('aria-pressed', isCardActive ? 'true' : 'false');
    });

    // Actualizar caption descriptivo
    if (captions[currentIndex]) {
      updateCaption(captions[currentIndex]);
    }
  }

  function nextSlide(fromUser = false) {
    goToSlide(currentIndex + 1, fromUser);
  }

  function prevSlide(fromUser = false) {
    goToSlide(currentIndex - 1, fromUser);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide(false);
    }, autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide(true);
      startAutoplay();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide(true);
      startAutoplay();
    });
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const slideIdx = parseInt(pill.getAttribute('data-slide'), 10);
      if (!isNaN(slideIdx)) {
        goToSlide(slideIdx, true);
        startAutoplay();
      }
    });
  });

  // Event Listeners en las tarjetas de la izquierda
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const slideIdx = parseInt(card.getAttribute('data-slide'), 10);
      if (!isNaN(slideIdx)) {
        goToSlide(slideIdx, true);
        startAutoplay();
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Touch Swipe en el viewport del slider
  const viewport = container.querySelector('.docente-slider-viewport');
  if (viewport) {
    let touchStartX = 0;
    viewport.addEventListener('touchstart', (e) => {
      stopAutoplay();
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide(true);
        } else {
          prevSlide(true);
        }
      }
      startAutoplay();
    }, { passive: true });
  }

  // Hover en contenedor para pausar / reanudar autoplay
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  // Inicializar en slide 0 con autoplay
  goToSlide(0);
  startAutoplay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlanificacionTabs);
} else {
  initPlanificacionTabs();
}
