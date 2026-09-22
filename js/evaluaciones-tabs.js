/**
 * evaluaciones-tabs.js
 * Control de vistas dinámicas para Docente y Alumno/Padre,
 * y Sliders Interactivos para el módulo de Gestión de Evaluaciones.
 */

export function initEvaluacionesTabs() {
  // ============================================================
  // 1. SELECTOR DE PESTAÑAS PRINCIPALES: DOCENTE VS ALUMNO/PADRE
  // ============================================================
  const tabBtnDocente = document.getElementById('tabBtnDocente');
  const tabBtnFamilia = document.getElementById('tabBtnFamilia');
  const viewDocente = document.getElementById('viewDocente');
  const viewFamilia = document.getElementById('viewFamilia');

  if (!tabBtnDocente || !tabBtnFamilia || !viewDocente || !viewFamilia) {
    return;
  }

  let startDocenteAutoplay = () => {};
  let stopDocenteAutoplay = () => {};
  let startFamiliaAutoplay = () => {};
  let stopFamiliaAutoplay = () => {};

  function switchTab(targetRole) {
    if (targetRole === 'docente') {
      tabBtnDocente.classList.add('active');
      tabBtnDocente.setAttribute('aria-selected', 'true');
      tabBtnFamilia.classList.remove('active');
      tabBtnFamilia.setAttribute('aria-selected', 'false');

      stopFamiliaAutoplay();

      viewFamilia.style.opacity = '0';
      viewFamilia.style.transform = 'translateY(12px)';

      setTimeout(() => {
        viewFamilia.style.display = 'none';
        viewDocente.style.display = 'grid';
        requestAnimationFrame(() => {
          viewDocente.style.opacity = '1';
          viewDocente.style.transform = 'translateY(0)';
          startDocenteAutoplay();
        });
      }, 200);
    } else {
      tabBtnFamilia.classList.add('active');
      tabBtnFamilia.setAttribute('aria-selected', 'true');
      tabBtnDocente.classList.remove('active');
      tabBtnDocente.setAttribute('aria-selected', 'false');

      stopDocenteAutoplay();

      viewDocente.style.opacity = '0';
      viewDocente.style.transform = 'translateY(12px)';

      setTimeout(() => {
        viewDocente.style.display = 'none';
        viewFamilia.style.display = 'grid';
        requestAnimationFrame(() => {
          viewFamilia.style.opacity = '1';
          viewFamilia.style.transform = 'translateY(0)';
          startFamiliaAutoplay();
        });
      }, 200);
    }
  }

  tabBtnDocente.addEventListener('click', () => switchTab('docente'));
  tabBtnFamilia.addEventListener('click', () => switchTab('familia'));

  // ============================================================
  // 2. SLIDER DOCENTE
  // ============================================================
  const docenteContainer = document.getElementById('docenteSliderContainer');
  const docenteTrack = document.getElementById('docenteSliderTrack');
  const docenteSlides = document.querySelectorAll('#docenteSliderContainer .docente-slide');
  const docentePills = document.querySelectorAll('#docenteSliderDots .docente-slider-pill');
  const docenteCards = document.querySelectorAll('.js-docente-card');
  const docenteBtnPrev = document.getElementById('docenteSliderPrev');
  const docenteBtnNext = document.getElementById('docenteSliderNext');
  const docenteCaption = document.getElementById('docenteMockupCaption');

  let docenteCurrentIndex = 0;
  const docenteTotalSlides = docenteSlides.length;
  let docenteAutoplayTimer = null;
  const autoplayInterval = 6000;

  const docenteSlideCaptions = [
    "<strong style='color: var(--text-main);'>Instrumentos de evaluación:</strong> Define el tipo de instrumento: Rubro de evaluación, Escala de Valoración, Lista de Cotejo y Rúbrica de aprendizaje.",
    "<strong style='color: var(--text-main);'>Evaluaciones del curso:</strong> Gestiona cuestionarios, tareas, foros y rutas de aprendizaje para evaluar el progreso formativo."
  ];

  function updateDocenteCaption(text) {
    if (!docenteCaption || !text) return;
    docenteCaption.classList.add('is-changing');
    setTimeout(() => {
      docenteCaption.innerHTML = text;
      docenteCaption.classList.remove('is-changing');
    }, 150);
  }

  function goToDocenteSlide(index, _fromUser = false) {
    if (docenteTotalSlides === 0 || !docenteTrack) return;

    if (index < 0) {
      docenteCurrentIndex = docenteTotalSlides - 1;
    } else if (index >= docenteTotalSlides) {
      docenteCurrentIndex = 0;
    } else {
      docenteCurrentIndex = index;
    }

    docenteTrack.style.transform = `translateX(-${docenteCurrentIndex * 100}%)`;

    docentePills.forEach((pill, i) => {
      const isActive = i === docenteCurrentIndex;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    docenteCards.forEach((card, i) => {
      const isActive = i === docenteCurrentIndex;
      card.classList.toggle('is-active', isActive);
      card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    docenteSlides.forEach((slide, i) => {
      const isActive = i === docenteCurrentIndex;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.style.opacity = isActive ? '1' : '0.35';
      slide.style.transform = isActive ? 'scale(1)' : 'scale(0.96)';
    });

    if (docenteSlideCaptions[docenteCurrentIndex]) {
      updateDocenteCaption(docenteSlideCaptions[docenteCurrentIndex]);
    }
  }

  function nextDocenteSlide(fromUser = false) {
    goToDocenteSlide(docenteCurrentIndex + 1, fromUser);
  }

  function prevDocenteSlide(fromUser = false) {
    goToDocenteSlide(docenteCurrentIndex - 1, fromUser);
  }

  startDocenteAutoplay = function () {
    stopDocenteAutoplay();
    docenteAutoplayTimer = setInterval(() => {
      nextDocenteSlide(false);
    }, autoplayInterval);
  };

  stopDocenteAutoplay = function () {
    if (docenteAutoplayTimer) {
      clearInterval(docenteAutoplayTimer);
      docenteAutoplayTimer = null;
    }
  };

  if (docenteBtnNext) {
    docenteBtnNext.addEventListener('click', (e) => {
      e.preventDefault();
      nextDocenteSlide(true);
      startDocenteAutoplay();
    });
  }

  if (docenteBtnPrev) {
    docenteBtnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      prevDocenteSlide(true);
      startDocenteAutoplay();
    });
  }

  docentePills.forEach((pill, idx) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      goToDocenteSlide(idx, true);
      startDocenteAutoplay();
    });
  });

  if (docenteContainer) {
    docenteContainer.addEventListener('mouseenter', stopDocenteAutoplay);
    docenteContainer.addEventListener('mouseleave', startDocenteAutoplay);

    let touchStartX = 0;
    docenteContainer.addEventListener('touchstart', (e) => {
      stopDocenteAutoplay();
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    docenteContainer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextDocenteSlide(true);
        } else {
          prevDocenteSlide(true);
        }
      }
      startDocenteAutoplay();
    }, { passive: true });
  }

  // Cards dinámicas en Docente
  docenteCards.forEach((card) => {
    card.addEventListener('click', () => {
      docenteCards.forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });

      card.classList.add('is-active');
      card.setAttribute('aria-pressed', 'true');

      const targetSlide = parseInt(card.getAttribute('data-slide') || '0', 10);
      goToDocenteSlide(targetSlide, true);
      startDocenteAutoplay();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ============================================================
  // 3. SLIDER ALUMNO / PADRE
  // ============================================================
  const familiaContainer = document.getElementById('familiaSliderContainer');
  const familiaTrack = document.getElementById('familiaSliderTrack');
  const familiaSlides = document.querySelectorAll('#familiaSliderContainer .familia-slide');
  const familiaPills = document.querySelectorAll('#familiaSliderDots .docente-slider-pill');
  const familiaBtnPrev = document.getElementById('familiaSliderPrev');
  const familiaBtnNext = document.getElementById('familiaSliderNext');
  const familiaCaption = document.getElementById('familiaMockupCaption');

  let familiaCurrentIndex = 0;
  const familiaTotalSlides = familiaSlides.length;
  let familiaAutoplayTimer = null;

  const familiaSlideCaptions = [
    "<strong style='color: var(--text-main);'>Bandeja de Evaluaciones:</strong> Vista clara de tareas programadas, fechas de vencimiento y rúbricas orientadoras para los estudiantes.",
    "<strong style='color: var(--text-main);'>Logros y Calificaciones:</strong> Reportes de progreso por competencia con conclusiones descriptivas y retroalimentación pedagógica oportuna."
  ];

  function updateFamiliaCaption(text) {
    if (!familiaCaption || !text) return;
    familiaCaption.classList.add('is-changing');
    setTimeout(() => {
      familiaCaption.innerHTML = text;
      familiaCaption.classList.remove('is-changing');
    }, 150);
  }

  function goToFamiliaSlide(index, _fromUser = false) {
    if (familiaTotalSlides === 0 || !familiaTrack) return;

    if (index < 0) {
      familiaCurrentIndex = familiaTotalSlides - 1;
    } else if (index >= familiaTotalSlides) {
      familiaCurrentIndex = 0;
    } else {
      familiaCurrentIndex = index;
    }

    familiaTrack.style.transform = `translateX(-${familiaCurrentIndex * 100}%)`;

    familiaPills.forEach((pill, i) => {
      const isActive = i === familiaCurrentIndex;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    familiaSlides.forEach((slide, i) => {
      const isActive = i === familiaCurrentIndex;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.style.opacity = isActive ? '1' : '0.35';
      slide.style.transform = isActive ? 'scale(1)' : 'scale(0.96)';
    });

    // Sincronizar tarjetas en familia
    const familiaCards = document.querySelectorAll('.js-familia-card');
    familiaCards.forEach((card) => {
      const cardSlide = parseInt(card.getAttribute('data-slide') || '0', 10);
      const isCardActive = cardSlide === familiaCurrentIndex;
      card.classList.toggle('is-active', isCardActive);
      card.setAttribute('aria-pressed', isCardActive ? 'true' : 'false');
    });

    if (familiaSlideCaptions[familiaCurrentIndex]) {
      updateFamiliaCaption(familiaSlideCaptions[familiaCurrentIndex]);
    }
  }

  function nextFamiliaSlide(fromUser = false) {
    goToFamiliaSlide(familiaCurrentIndex + 1, fromUser);
  }

  function prevFamiliaSlide(fromUser = false) {
    goToFamiliaSlide(familiaCurrentIndex - 1, fromUser);
  }

  startFamiliaAutoplay = function () {
    stopFamiliaAutoplay();
    familiaAutoplayTimer = setInterval(() => {
      nextFamiliaSlide(false);
    }, autoplayInterval);
  };

  stopFamiliaAutoplay = function () {
    if (familiaAutoplayTimer) {
      clearInterval(familiaAutoplayTimer);
      familiaAutoplayTimer = null;
    }
  };

  if (familiaBtnNext) {
    familiaBtnNext.addEventListener('click', (e) => {
      e.preventDefault();
      nextFamiliaSlide(true);
      startFamiliaAutoplay();
    });
  }

  if (familiaBtnPrev) {
    familiaBtnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      prevFamiliaSlide(true);
      startFamiliaAutoplay();
    });
  }

  familiaPills.forEach((pill, idx) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      goToFamiliaSlide(idx, true);
      startFamiliaAutoplay();
    });
  });

  if (familiaContainer) {
    familiaContainer.addEventListener('mouseenter', stopFamiliaAutoplay);
    familiaContainer.addEventListener('mouseleave', startFamiliaAutoplay);

    let touchStartX = 0;
    familiaContainer.addEventListener('touchstart', (e) => {
      stopFamiliaAutoplay();
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    familiaContainer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextFamiliaSlide(true);
        } else {
          prevFamiliaSlide(true);
        }
      }
      startFamiliaAutoplay();
    }, { passive: true });
  }

  const familiaCards = document.querySelectorAll('.js-familia-card');
  familiaCards.forEach((card) => {
    card.addEventListener('click', () => {
      const targetSlide = parseInt(card.getAttribute('data-slide') || '0', 10);
      goToFamiliaSlide(targetSlide, true);
      startFamiliaAutoplay();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Inicialización
  goToDocenteSlide(0);
  goToFamiliaSlide(0);
  startDocenteAutoplay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEvaluacionesTabs);
} else {
  initEvaluacionesTabs();
}
