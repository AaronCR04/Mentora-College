/* ==========================================================================
   IA MODAL CONTROLLER - MENTORA COLLEGE
   Visualizador interactivo para los 4 pilares de IA:
   CREA, EVALÚA, RETROALIMENTA y ANALIZA
   ========================================================================== */

export function initIaModal() {
  const overlay = document.getElementById('iaModalOverlay');
  if (!overlay) return;

  const badgeEl = document.getElementById('iaModalBadge');
  const titleEl = document.getElementById('iaModalTitle');
  const imgEl = document.getElementById('iaModalImg');
  const descEl = document.getElementById('iaModalDesc');

  const iaData = {
    crea: {
      badge: 'CREA',
      title: 'Generar recursos con IA',
      img: './assets/ia-modal-crea.png',
      desc: 'Genera recursos pedagógicos e instrumentos de evaluación a partir del contexto y parámetros del docente.',
      color: '#7c3aed',
      bg: '#f3e8ff'
    },
    evalua: {
      badge: 'EVALÚA',
      title: 'Evaluación y revisión criterial con IA',
      img: './assets/ecosistema-03-evalua.png',
      desc: 'Apoya la revisión ágil de tareas, cuestionarios y evidencias según criterios pedagógicos curriculares.',
      color: '#4f46e5',
      bg: '#ede9fe'
    },
    retroalimenta: {
      badge: 'RETROALIMENTA',
      title: 'Análisis cualitativo y retroalimentación formativa',
      img: './assets/ecosistema-04-retroalimenta.png',
      desc: 'Genera orientaciones personalizadas que ayudan al estudiante a comprender cómo mejorar su aprendizaje.',
      color: '#0284c7',
      bg: '#e0f2fe'
    },
    analiza: {
      badge: 'ANALIZA',
      title: 'Ficha de analítica y logro pedagógico con IA',
      img: './assets/ecosistema-06-mejora.png',
      desc: 'Interpreta resultados grupales e individuales, niveles de logro y predicción de refuerzo educativo.',
      color: '#c026d3',
      bg: '#fdf2f8'
    }
  };

  function openModal(type) {
    const data = iaData[type] || iaData.crea;
    if (badgeEl) {
      badgeEl.textContent = data.badge;
      badgeEl.style.color = data.color;
      badgeEl.style.backgroundColor = data.bg;
    }
    if (titleEl) {
      titleEl.textContent = data.title;
    }
    if (imgEl) {
      imgEl.src = data.img;
      imgEl.alt = data.title;
    }
    if (descEl) {
      descEl.textContent = data.desc;
    }

    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event listeners for triggers
  document.querySelectorAll('[data-ia-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const type = trigger.getAttribute('data-ia-modal');
      openModal(type);
    });
  });

  // Event listeners for close buttons and backdrop
  overlay.querySelectorAll('[data-close-ia-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeModal();
    }
  });
}
