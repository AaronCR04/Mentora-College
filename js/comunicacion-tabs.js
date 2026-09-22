/**
 * comunicacion-tabs.js
 * Control de vistas dinámicas para Docente y Alumno/Padre,
 * y Sliders Interactivos de Creación (Docente) y Visualización (Alumno/Padre)
 * en el módulo de Comunicación Colegio - Familias.
 */

export function initComunicacionTabs() {
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

  // Declaraciones previas de funciones de autoplay para coordinar con las pestañas
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

      // Pausar autoplay de familia
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

      // Pausar autoplay de docente
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
  // 2. SLIDER DOCENTE: Creación y Edición (Computadora / Celular)
  // ============================================================
  const docenteContainer = document.getElementById('docenteSliderContainer');
  const docenteTrack = document.getElementById('docenteSliderTrack');
  const docenteSlides = document.querySelectorAll('#panelDocenteCreacion .docente-slide');
  const docentePills = document.querySelectorAll('#docenteSliderDots .docente-slider-pill');
  const docenteBtnPrev = document.getElementById('docenteSliderPrev');
  const docenteBtnNext = document.getElementById('docenteSliderNext');
  const docenteCaption = document.getElementById('docenteMockupCaption');

  let docenteCurrentIndex = 0;
  const docenteTotalSlides = docenteSlides.length;
  let docenteAutoplayTimer = null;
  const autoplayInterval = 6000;

  const docenteSlideCaptions = [
    "<strong style='color: var(--text-main);'>Vista Computadora:</strong> Editor enriquecido en pantalla amplia para redactar con total comodidad y adjuntar archivos multimedia.",
    "<strong style='color: var(--text-main);'>Vista Celular:</strong> Creación y publicación rápida desde la app móvil para avisos inmediatos o de última hora."
  ];

  function updateDocenteCaption(text) {
    if (!docenteCaption || !text) return;
    docenteCaption.classList.add('is-changing');
    setTimeout(() => {
      docenteCaption.innerHTML = text;
      docenteCaption.classList.remove('is-changing');
    }, 150);
  }

  function goToDocenteSlide(index, fromUser = false) {
    if (docenteTotalSlides === 0 || !docenteTrack) return;

    if (index < 0) {
      docenteCurrentIndex = docenteTotalSlides - 1;
    } else if (index >= docenteTotalSlides) {
      docenteCurrentIndex = 0;
    } else {
      docenteCurrentIndex = index;
    }

    // Desplazamiento horizontal
    docenteTrack.style.transform = `translateX(-${docenteCurrentIndex * 100}%)`;

    // Actualizar pills
    docentePills.forEach((pill, i) => {
      const isActive = i === docenteCurrentIndex;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Actualizar visibilidad de slides
    docenteSlides.forEach((slide, i) => {
      const isActive = i === docenteCurrentIndex;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.style.opacity = isActive ? '1' : '0.35';
      slide.style.transform = isActive ? 'scale(1)' : 'scale(0.96)';
    });

    // Actualizar leyenda si viene de interacción de usuario o autoplay
    if (fromUser && docenteSlideCaptions[docenteCurrentIndex]) {
      updateDocenteCaption(docenteSlideCaptions[docenteCurrentIndex]);
    }
  }

  function nextDocenteSlide(fromUser = false) {
    goToDocenteSlide(docenteCurrentIndex + 1, fromUser);
  }

  function prevDocenteSlide(fromUser = false) {
    goToDocenteSlide(docenteCurrentIndex - 1, fromUser);
  }

  startDocenteAutoplay = function() {
    stopDocenteAutoplay();
    if (docenteTotalSlides <= 1) return;
    // Solo reproducir si estamos en la pestaña docente y el panel de creación está activo
    const panelCreacion = document.getElementById('panelDocenteCreacion');
    if (tabBtnDocente.classList.contains('active') && panelCreacion && panelCreacion.classList.contains('is-active')) {
      docenteAutoplayTimer = setInterval(() => {
        nextDocenteSlide(false);
      }, autoplayInterval);
    }
  };

  stopDocenteAutoplay = function() {
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

  // 3. Manejo de cards dinámicas en Docente (Creación vs Segmentación)
  const docenteCards = document.querySelectorAll('.js-docente-card');
  const panelCreacion = document.getElementById('panelDocenteCreacion');
  const panelSegmentacion = document.getElementById('panelDocenteSegmentacion');

  const mediaPanels = {
    creacion: panelCreacion,
    segmentacion: panelSegmentacion
  };

  function switchDocentePanel(panelKey) {
    Object.entries(mediaPanels).forEach(([key, panel]) => {
      if (!panel) return;
      if (key === panelKey) {
        panel.classList.add('is-active');
      } else {
        panel.classList.remove('is-active');
      }
    });

    if (panelKey === 'creacion') {
      goToDocenteSlide(0, false);
      startDocenteAutoplay();
    } else {
      stopDocenteAutoplay();
    }
  }

  docenteCards.forEach((card) => {
    card.addEventListener('click', () => {
      docenteCards.forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });

      card.classList.add('is-active');
      card.setAttribute('aria-pressed', 'true');

      const targetPanel = card.getAttribute('data-panel');
      if (targetPanel && mediaPanels[targetPanel]) {
        switchDocentePanel(targetPanel);
      }

      const targetCaption = card.getAttribute('data-caption');
      if (targetCaption) {
        updateDocenteCaption(targetCaption);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Inicializar slider docente
  if (docenteSlides.length > 0) {
    goToDocenteSlide(0);
    startDocenteAutoplay();
  }

  // ============================================================
  // 4. SLIDER ALUMNO / PADRE: Visualización (Computadora / Celular)
  // ============================================================
  const familiaContainer = document.getElementById('familiaSliderContainer');
  const familiaTrack = document.getElementById('familiaSliderTrack');
  const familiaSlides = document.querySelectorAll('#familiaSliderContainer .familia-slide');
  const familiaPills = document.querySelectorAll('#familiaSliderDots .familia-slider-pill');
  const familiaBtnPrev = document.getElementById('familiaSliderPrev');
  const familiaBtnNext = document.getElementById('familiaSliderNext');
  const familiaCaption = document.getElementById('familiaMockupCaption');
  const familiaCards = document.querySelectorAll('.js-familia-card');

  let familiaCurrentIndex = 0;
  const familiaTotalSlides = familiaSlides.length;
  let familiaAutoplayTimer = null;

  const familiaSlideCaptions = [
    "<strong style='color: var(--text-main);'>Vista Computadora:</strong> Consulta detallada de avisos, circulares y adjuntos escolares en pantalla amplia con panel organizado por materias.",
    "<strong style='color: var(--text-main);'>Vista Móvil:</strong> Acceso instantáneo a la bandeja de comunicados y notificaciones en tiempo real desde la app escolar para familias."
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

    // Desplazamiento horizontal fluido
    familiaTrack.style.transform = `translateX(-${familiaCurrentIndex * 100}%)`;

    // Actualizar pills de dispositivo
    familiaPills.forEach((pill, i) => {
      const isActive = i === familiaCurrentIndex;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Actualizar visibilidad y escala de los slides
    familiaSlides.forEach((slide, i) => {
      const isActive = i === familiaCurrentIndex;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.style.opacity = isActive ? '1' : '0.35';
      slide.style.transform = isActive ? 'scale(1)' : 'scale(0.96)';
    });

    // Sincronizar card activa en la columna izquierda
    familiaCards.forEach((card) => {
      const cardSlide = parseInt(card.getAttribute('data-slide') || '0', 10);
      const isCardActive = cardSlide === familiaCurrentIndex;
      card.classList.toggle('is-active', isCardActive);
      card.setAttribute('aria-pressed', isCardActive ? 'true' : 'false');
    });

    // Actualizar leyenda explicativa
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

  startFamiliaAutoplay = function() {
    stopFamiliaAutoplay();
    if (tabBtnFamilia.classList.contains('active')) {
      familiaAutoplayTimer = setInterval(() => {
        nextFamiliaSlide(false);
      }, autoplayInterval);
    }
  };

  stopFamiliaAutoplay = function() {
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

  // Clic interactivo en las cards de la columna izquierda de Familia
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

  // Inicializar estado del slider familia
  if (familiaSlides.length > 0) {
    goToFamiliaSlide(0);
  }
}

// Auto-inicialización si el DOM ya cargó
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComunicacionTabs);
} else {
  initComunicacionTabs();
}
