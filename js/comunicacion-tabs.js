/**
 * comunicacion-tabs.js
 * Control de vistas dinámicas para Docente y Alumno/Padre
 * y Slider de Creación y Edición Rápida (Computadora / Celular)
 * en el módulo de Comunicación Colegio - Familias.
 */

export function initComunicacionTabs() {
  // 1. Selector de Pestañas Principales: Docente vs Alumno/Padre
  const tabBtnDocente = document.getElementById('tabBtnDocente');
  const tabBtnFamilia = document.getElementById('tabBtnFamilia');
  const viewDocente = document.getElementById('viewDocente');
  const viewFamilia = document.getElementById('viewFamilia');

  if (!tabBtnDocente || !tabBtnFamilia || !viewDocente || !viewFamilia) {
    return;
  }

  function switchTab(targetRole) {
    if (targetRole === 'docente') {
      tabBtnDocente.classList.add('active');
      tabBtnDocente.setAttribute('aria-selected', 'true');
      tabBtnFamilia.classList.remove('active');
      tabBtnFamilia.setAttribute('aria-selected', 'false');

      viewFamilia.style.opacity = '0';
      viewFamilia.style.transform = 'translateY(12px)';

      setTimeout(() => {
        viewFamilia.style.display = 'none';
        viewDocente.style.display = 'grid';
        requestAnimationFrame(() => {
          viewDocente.style.opacity = '1';
          viewDocente.style.transform = 'translateY(0)';
        });
      }, 200);
    } else {
      tabBtnFamilia.classList.add('active');
      tabBtnFamilia.setAttribute('aria-selected', 'true');
      tabBtnDocente.classList.remove('active');
      tabBtnDocente.setAttribute('aria-selected', 'false');

      viewDocente.style.opacity = '0';
      viewDocente.style.transform = 'translateY(12px)';

      setTimeout(() => {
        viewDocente.style.display = 'none';
        viewFamilia.style.display = 'grid';
        requestAnimationFrame(() => {
          viewFamilia.style.opacity = '1';
          viewFamilia.style.transform = 'translateY(0)';
        });
      }, 200);
    }
  }

  tabBtnDocente.addEventListener('click', () => switchTab('docente'));
  tabBtnFamilia.addEventListener('click', () => switchTab('familia'));

  // 2. Slider Interactivo para Creación y Edición Docente (Computadora / Celular)
  const sliderContainer = document.getElementById('docenteSliderContainer');
  const sliderTrack = document.getElementById('docenteSliderTrack');
  const slides = document.querySelectorAll('.docente-slide');
  const pills = document.querySelectorAll('.docente-slider-pill');
  const btnPrev = document.getElementById('docenteSliderPrev');
  const btnNext = document.getElementById('docenteSliderNext');
  const captionEl = document.getElementById('docenteMockupCaption');

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;
  const autoplayInterval = 6000;

  function goToSlide(index, fromUser = false) {
    if (totalSlides === 0 || !sliderTrack) return;

    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Traslación horizontal suave
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Actualizar pills de dispositivo
    pills.forEach((pill, i) => {
      if (i === currentIndex) {
        pill.classList.add('is-active');
        pill.setAttribute('aria-selected', 'true');
      } else {
        pill.classList.remove('is-active');
        pill.setAttribute('aria-selected', 'false');
      }
    });

    // Actualizar visibilidad y accesibilidad de slides
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.setAttribute('aria-hidden', 'false');
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)';
      } else {
        slide.setAttribute('aria-hidden', 'true');
        slide.style.opacity = '0.35';
        slide.style.transform = 'scale(0.96)';
      }
    });

    // Si el usuario cambia de slide manualmente y la card activa es la 1, actualizar caption
    if (fromUser) {
      const activeCard = document.querySelector('.js-docente-card.is-active');
      if (activeCard && captionEl) {
        if (currentIndex === 0) {
          captionEl.innerHTML = "<strong style='color: var(--text-main);'>Vista Computadora:</strong> Editor enriquecido en pantalla amplia para redactar con total comodidad y adjuntar archivos multimedia.";
        } else {
          captionEl.innerHTML = "<strong style='color: var(--text-main);'>Vista Celular:</strong> Creación y publicación rápida desde la app móvil para avisos inmediatos o de última hora.";
        }
      }
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

  pills.forEach((pill, idx) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(idx, true);
      startAutoplay();
    });
  });

  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    // Soporte táctil / Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
      stopAutoplay();
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
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

  // Inicializar slider docente
  if (slides.length > 0) {
    goToSlide(0);
    startAutoplay();
  }

  // 3. Manejo de paneles dinámicos y clic en cards de Docente
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

    // Control de autoplay si estamos en el slider de creación
    if (panelKey === 'creacion') {
      goToSlide(0, false);
      startAutoplay();
    } else {
      stopAutoplay();
    }
  }

  docenteCards.forEach((card) => {
    card.addEventListener('click', () => {
      // Desactivar todas las cards
      docenteCards.forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });

      // Activar la card seleccionada
      card.classList.add('is-active');
      card.setAttribute('aria-pressed', 'true');

      // Cambiar de panel de imagen de forma fluida
      const targetPanel = card.getAttribute('data-panel');
      if (targetPanel && mediaPanels[targetPanel]) {
        switchDocentePanel(targetPanel);
      }

      // Actualizar la leyenda explicativa con micro fade suave
      const targetCaption = card.getAttribute('data-caption');
      if (captionEl && targetCaption) {
        captionEl.classList.add('is-changing');
        setTimeout(() => {
          captionEl.innerHTML = targetCaption;
          captionEl.classList.remove('is-changing');
        }, 150);
      }
    });

    // Accesibilidad por teclado
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // 4. Manejo de confirmación en la bandeja Familia
  const confirmBtn = document.getElementById('btnConfirmRead');
  const confirmStatus = document.getElementById('confirmStatusBadge');
  if (confirmBtn && confirmStatus) {
    confirmBtn.addEventListener('click', () => {
      confirmBtn.style.display = 'none';
      confirmStatus.style.display = 'inline-flex';
    });
  }
}

// Auto-inicialización si el DOM ya cargó
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComunicacionTabs);
} else {
  initComunicacionTabs();
}
