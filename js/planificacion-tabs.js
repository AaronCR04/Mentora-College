/**
 * planificacion-tabs.js
 * Control interactivo para paneles solapados y sliders independientes de:
 * 1. Planificación y creación de unidades y sesiones (2 slides)
 * 2. Planificación y creación de criterios para la sesión (3 slides)
 */

export function initPlanificacionTabs() {
  const container = document.getElementById('planSliderContainer');
  const captionEl = document.getElementById('planMockupCaption');
  const cards = document.querySelectorAll('.js-plan-card');

  const panelUnidades = document.getElementById('panelPlanUnidades');
  const panelCriterios = document.getElementById('panelPlanCriterios');

  if (!container || !panelUnidades || !panelCriterios) {
    return;
  }

  // ============================================================
  // ESTADO Y CAPTIONS
  // ============================================================
  let activePanelKey = 'unidades'; // 'unidades' | 'criterios'

  const captions = {
    unidades: [
      "<strong style='color: var(--text-main);'>Planificación de Unidades y Sesiones:</strong> Estructura unidades didácticas y sesiones relacionando directamente al currículo institucional.",
      "<strong style='color: var(--text-main);'>Asignación de Fechas:</strong> Asigna fechas y cronogramas para cada sesión de las unidades del curso con total flexibilidad."
    ],
    criterios: [
      "<strong style='color: var(--text-main);'>Asignar Competencias:</strong> Vincula las competencias y capacidades oficiales del currículo institucional a cada sesión.",
      "<strong style='color: var(--text-main);'>Crear Criterios de Evaluación:</strong> Redacta y gestiona criterios claros e indicadores precisos para evaluar el aprendizaje.",
      "<strong style='color: var(--text-main);'>Agregar Criterios a la Sesión:</strong> Asocia los criterios directamente a las actividades y evidencias de la sesión de clase."
    ]
  };

  function updateCaption(text) {
    if (!captionEl || !text) return;
    captionEl.classList.add('is-changing');
    setTimeout(() => {
      captionEl.innerHTML = text;
      captionEl.classList.remove('is-changing');
    }, 150);
  }

  // ============================================================
  // CONTROLADOR DE SLIDER GENÉRICO
  // ============================================================
  function createSliderController({ panelEl, trackId, slideClass, dotsContainerId, btnPrevId, btnNextId, panelKey }) {
    const track = document.getElementById(trackId);
    const slides = panelEl.querySelectorAll(`.${slideClass}`);
    const pills = document.querySelectorAll(`#${dotsContainerId} .docente-slider-pill`);
    const btnPrev = document.getElementById(btnPrevId);
    const btnNext = document.getElementById(btnNextId);

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayTimer = null;
    const autoplayInterval = 6000;

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

      // Actualizar caption si este panel está activo actualmente
      if (activePanelKey === panelKey && captions[panelKey] && captions[panelKey][currentIndex]) {
        updateCaption(captions[panelKey][currentIndex]);
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
      // Solo correr autoplay si este panel es el actualmente activo en pantalla
      if (activePanelKey !== panelKey) return;

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

    pills.forEach((pill, idx) => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx, true);
        startAutoplay();
      });
    });

    // Touch Swipe en el viewport del panel
    const viewport = panelEl.querySelector('.docente-slider-viewport');
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

    // Inicializar estado de este slider
    goToSlide(0);

    return {
      goToSlide,
      nextSlide,
      prevSlide,
      startAutoplay,
      stopAutoplay,
      getCurrentIndex: () => currentIndex
    };
  }

  // ============================================================
  // INSTANCIAS DE LOS DOS SLIDERS
  // ============================================================
  const sliderUnidades = createSliderController({
    panelEl: panelUnidades,
    trackId: 'unidadesSliderTrack',
    slideClass: 'unidades-slide',
    dotsContainerId: 'unidadesSliderDots',
    btnPrevId: 'unidadesSliderPrev',
    btnNextId: 'unidadesSliderNext',
    panelKey: 'unidades'
  });

  const sliderCriterios = createSliderController({
    panelEl: panelCriterios,
    trackId: 'criteriosSliderTrack',
    slideClass: 'criterios-slide',
    dotsContainerId: 'criteriosSliderDots',
    btnPrevId: 'criteriosSliderPrev',
    btnNextId: 'criteriosSliderNext',
    panelKey: 'criterios'
  });

  // ============================================================
  // CAMBIO DE PANELES (TARJETAS IZQUIERDAS)
  // ============================================================
  function switchPanel(panelKey) {
    if (activePanelKey === panelKey) return;
    activePanelKey = panelKey;

    if (panelKey === 'unidades') {
      sliderCriterios.stopAutoplay();
      panelCriterios.classList.remove('is-active');
      panelUnidades.classList.add('is-active');

      sliderUnidades.goToSlide(0, false);
      sliderUnidades.startAutoplay();
    } else {
      sliderUnidades.stopAutoplay();
      panelUnidades.classList.remove('is-active');
      panelCriterios.classList.add('is-active');

      sliderCriterios.goToSlide(0, false);
      sliderCriterios.startAutoplay();
    }

    // Sincronizar clases activas en las tarjetas de la izquierda
    cards.forEach((card) => {
      const cardPanel = card.getAttribute('data-panel');
      const isCardActive = cardPanel === panelKey;
      card.classList.toggle('is-active', isCardActive);
      card.setAttribute('aria-pressed', isCardActive ? 'true' : 'false');
    });
  }

  // Event Listeners en las tarjetas de la izquierda
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const targetPanel = card.getAttribute('data-panel');
      if (targetPanel) {
        switchPanel(targetPanel);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Hover en contenedor compartido para pausar / reanudar autoplay
  container.addEventListener('mouseenter', () => {
    sliderUnidades.stopAutoplay();
    sliderCriterios.stopAutoplay();
  });

  container.addEventListener('mouseleave', () => {
    if (activePanelKey === 'unidades') {
      sliderUnidades.startAutoplay();
    } else {
      sliderCriterios.startAutoplay();
    }
  });

  // Inicio por defecto: Panel Unidades activo con autoplay
  sliderUnidades.startAutoplay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlanificacionTabs);
} else {
  initPlanificacionTabs();
}
