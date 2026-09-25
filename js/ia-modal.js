/* ==========================================================================
   IA MODAL CONTROLLER - MENTORA COLLEGE
   Visualizador interactivo para los pilares de IA:
   - DOCENTES: Recursos (Video Drive), Instrumentos (Video Drive), Evaluaciones, Foros, Rutas
   - ESTUDIANTES: Revisión de tareas, Retroalimentación de ruta de aprendizaje
   ========================================================================== */

export function initIaModal() {
  const overlay = document.getElementById('iaModalOverlay');
  if (!overlay) return;

  const badgeEl = document.getElementById('iaModalBadge');
  const titleEl = document.getElementById('iaModalTitle');
  const imgEl = document.getElementById('iaModalImg');
  const descEl = document.getElementById('iaModalDesc');
  const videoContainer = document.getElementById('iaModalVideoContainer');
  const iframeEl = document.getElementById('iaModalIframe');
  const prevBtn = document.getElementById('iaSlidePrev');
  const nextBtn = document.getElementById('iaSlideNext');
  const dotsContainer = document.getElementById('iaSlideDots');
  const dotBtns = document.querySelectorAll('.ia-video-dot');

  let currentVideos = [];
  let currentDescs = [];
  let currentVideoIndex = 0;

  const iaData = {
    // 1. DOCENTE: Creación de Recursos con IA (YouTube)
    recursos: {
      badge: 'RECURSOS',
      title: 'Creación de Recursos con IA',
      videos: [
        'https://www.youtube.com/embed/it08ugia8Zc?autoplay=1&rel=0'
      ],
      descs: [
        'Generación inteligente de fichas didácticas, lecturas adaptadas y materiales pedagógicos alineados al contexto y nivel del aula.'
      ],
      color: '#7c3aed',
      bg: '#f3e8ff',
      darkColor: '#c084fc',
      darkBg: 'rgba(168, 85, 247, 0.16)'
    },
    // Alias para compatibilidad con código previo
    crea: {
      badge: 'RECURSOS',
      title: 'Creación de Recursos con IA',
      videos: [
        'https://www.youtube.com/embed/it08ugia8Zc?autoplay=1&rel=0'
      ],
      descs: [
        'Generación inteligente de fichas didácticas, lecturas adaptadas y materiales pedagógicos alineados al contexto y nivel del aula.'
      ],
      color: '#7c3aed',
      bg: '#f3e8ff',
      darkColor: '#c084fc',
      darkBg: 'rgba(168, 85, 247, 0.16)'
    },

    // 2. DOCENTE: Crear instrumentos de evaluación con IA (YouTube)
    instrumentos: {
      badge: 'INSTRUMENTOS',
      title: 'Crear instrumentos de evaluación con IA',
      videos: [
        'https://www.youtube.com/embed/yiUu5AP1d2g?autoplay=1&rel=0'
      ],
      descs: [
        'Construcción de rúbricas por niveles de logro (AD, A, B, C), listas de cotejo y matrices de evaluación por competencias.'
      ],
      color: '#4f46e5',
      bg: '#ede9fe',
      darkColor: '#818cf8',
      darkBg: 'rgba(99, 102, 241, 0.16)'
    },
    // Alias para compatibilidad con código previo
    evalua: {
      badge: 'INSTRUMENTOS',
      title: 'Crear instrumentos de evaluación con IA',
      videos: [
        'https://www.youtube.com/embed/yiUu5AP1d2g?autoplay=1&rel=0'
      ],
      descs: [
        'Construcción de rúbricas por niveles de logro (AD, A, B, C), listas de cotejo y matrices de evaluación por competencias.'
      ],
      color: '#4f46e5',
      bg: '#ede9fe',
      darkColor: '#818cf8',
      darkBg: 'rgba(99, 102, 241, 0.16)'
    },

    // 3. DOCENTE: Revisar evaluaciones con IA (YouTube)
    evaluaciones: {
      badge: 'EVALUACIONES',
      title: 'Revisar evaluaciones con IA',
      videos: [
        'https://www.youtube.com/embed/kZdhx7r-PdI?autoplay=1&rel=0'
      ],
      descs: [
        'Agiliza la revisión de los entregables de las tareas con criterios pedagógicos objetivos y transparentes.'
      ],
      color: '#0284c7',
      bg: '#e0f2fe',
      darkColor: '#38bdf8',
      darkBg: 'rgba(14, 165, 233, 0.16)'
    },

    // 4. DOCENTE: Foros inteligentes (YouTube)
    foros: {
      badge: 'FOROS',
      title: 'Foros inteligentes',
      videos: [
        'https://www.youtube.com/embed/5CjyWmlkIYA?autoplay=1&rel=0'
      ],
      descs: [
        'Realiza una evaluación cualitativa y genera feedback a las respuestas del estudiante del foro.'
      ],
      color: '#d97706',
      bg: '#fef3c7',
      darkColor: '#fbbf24',
      darkBg: 'rgba(245, 158, 11, 0.16)'
    },

    // 5. DOCENTE: Generar rutas de aprendizaje con IA (YouTube)
    rutas: {
      badge: 'RUTAS',
      title: 'Generar rutas de aprendizaje con IA',
      videos: [
        'https://www.youtube.com/embed/i7zjvZnx274?autoplay=1&rel=0'
      ],
      descs: [
        'Estructura secuencias modulares y trayectorias formativas adaptadas a los ritmos y necesidades de cada grupo.'
      ],
      color: '#c026d3',
      bg: '#fdf2f8',
      darkColor: '#e879f9',
      darkBg: 'rgba(217, 70, 239, 0.16)'
    },
    analiza: {
      badge: 'RUTAS',
      title: 'Generar rutas de aprendizaje con IA',
      videos: [
        'https://www.youtube.com/embed/i7zjvZnx274?autoplay=1&rel=0'
      ],
      descs: [
        'Estructura secuencias modulares y trayectorias formativas adaptadas a los ritmos y necesidades de cada grupo.'
      ],
      color: '#c026d3',
      bg: '#fdf2f8',
      darkColor: '#e879f9',
      darkBg: 'rgba(217, 70, 239, 0.16)'
    },

    // 6. DOCENTE: Mentor Genesys (YouTube)
    'mentor-genesys': {
      badge: 'MENTOR GENESYS',
      title: 'Mentor Genesys',
      videos: [
        'https://www.youtube.com/embed/OXM0kweS2y4?autoplay=1&rel=0'
      ],
      descs: [
        'Mentor Genesys es un asistente virtual que ayudará a resolver durante todo el ciclo del aprendizaje al usuario.'
      ],
      color: '#2563eb',
      bg: '#eff6ff',
      darkColor: '#60a5fa',
      darkBg: 'rgba(59, 130, 246, 0.16)'
    },
    'chat-gemini': {
      badge: 'MENTOR GENESYS',
      title: 'Mentor Genesys',
      videos: [
        'https://www.youtube.com/embed/OXM0kweS2y4?autoplay=1&rel=0'
      ],
      descs: [
        'Mentor Genesys es un asistente virtual que ayudará a resolver durante todo el ciclo del aprendizaje al usuario.'
      ],
      color: '#2563eb',
      bg: '#eff6ff',
      darkColor: '#60a5fa',
      darkBg: 'rgba(59, 130, 246, 0.16)'
    },
    'chat': {
      badge: 'MENTOR GENESYS',
      title: 'Mentor Genesys',
      videos: [
        'https://www.youtube.com/embed/OXM0kweS2y4?autoplay=1&rel=0'
      ],
      descs: [
        'Mentor Genesys es un asistente virtual que ayudará a resolver durante todo el ciclo del aprendizaje al usuario.'
      ],
      color: '#2563eb',
      bg: '#eff6ff',
      darkColor: '#60a5fa',
      darkBg: 'rgba(59, 130, 246, 0.16)'
    },

    // 7. ESTUDIANTE: Revisión de tareas con IA (YouTube)
    'est-tareas': {
      badge: 'ESTUDIANTE',
      title: 'Revisión de tareas con IA',
      videos: [
        'https://www.youtube.com/embed/KRRTNGZqgxQ?autoplay=1&rel=0'
      ],
      descs: [
        'Orientación formativa previa a la entrega final para identificar áreas de mejora sin otorgar respuestas automáticas.'
      ],
      color: '#059669',
      bg: '#d1fae5',
      darkColor: '#34d399',
      darkBg: 'rgba(16, 185, 129, 0.16)'
    },

    // 8. ESTUDIANTE: Retroalimentación de R.A. con IA (YouTube)
    'est-ruta': {
      badge: 'ESTUDIANTE',
      title: 'Retroalimentación de R.A. con IA',
      videos: [
        'https://www.youtube.com/embed/0Y5sJxm2Cyo?autoplay=1&rel=0'
      ],
      descs: [
        'Retroalimentación formativa para el estudiante para cada reto planteado en las Rutas de Aprendizaje.'
      ],
      color: '#6366f1',
      bg: '#e0e7ff',
      darkColor: '#a5b4fc',
      darkBg: 'rgba(99, 102, 241, 0.16)'
    }
  };

  function setVideo(index) {
    if (!currentVideos || currentVideos.length === 0) return;
    currentVideoIndex = (index + currentVideos.length) % currentVideos.length;

    if (iframeEl) {
      iframeEl.src = currentVideos[currentVideoIndex];
    }

    if (descEl && currentDescs && currentDescs[currentVideoIndex]) {
      descEl.textContent = currentDescs[currentVideoIndex];
    }

    // Actualizar dots
    dotBtns.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentVideoIndex);
    });
  }

  function openModal(type) {
    const data = iaData[type] || iaData.recursos;
    if (badgeEl) {
      badgeEl.textContent = data.badge;
      badgeEl.style.color = data.darkColor || data.color;
      badgeEl.style.backgroundColor = data.darkBg || 'rgba(255, 255, 255, 0.08)';
      badgeEl.style.borderColor = (data.darkColor || data.color) ? `${data.darkColor || data.color}55` : 'rgba(255, 255, 255, 0.2)';
    }
    if (titleEl) {
      titleEl.textContent = data.title;
    }

    if (data.videos && data.videos.length > 0) {
      // Modo Video
      currentVideos = data.videos;
      currentDescs = data.descs || [data.desc];
      if (imgEl) {
        imgEl.style.display = 'none';
        imgEl.src = '';
      }
      if (videoContainer) {
        videoContainer.style.display = 'flex';
      }

      // Si hay más de 1 video, mostrar controles de slide; si es 1, ocultar flechas y dots
      const hasMultipleVideos = currentVideos.length > 1;
      if (prevBtn) prevBtn.style.display = hasMultipleVideos ? 'flex' : 'none';
      if (nextBtn) nextBtn.style.display = hasMultipleVideos ? 'flex' : 'none';
      if (dotsContainer) dotsContainer.style.display = hasMultipleVideos ? 'flex' : 'none';

      setVideo(0);
    } else {
      // Modo Imagen
      currentVideos = [];
      if (videoContainer) {
        videoContainer.style.display = 'none';
      }
      if (iframeEl) {
        iframeEl.src = '';
      }
      if (imgEl) {
        imgEl.style.display = 'block';
        imgEl.src = data.img;
        imgEl.alt = data.title;
      }
      if (descEl) {
        descEl.textContent = data.desc;
      }
    }

    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Detener reproducción al cerrar desmontando el src
    if (iframeEl) {
      iframeEl.src = '';
    }
  }

  // Controles de flechas (solo iconos)
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setVideo(currentVideoIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setVideo(currentVideoIndex + 1);
    });
  }

  // Controles de dots
  dotBtns.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        setVideo(idx);
      }
    });
  });

  // Event listeners para cualquier disparador con [data-ia-modal] (cards de IA y footer)
  document.querySelectorAll('[data-ia-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const type = trigger.getAttribute('data-ia-modal');
      openModal(type);
    });
  });

  // Event listeners para cerrar modal
  overlay.querySelectorAll('[data-close-ia-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  });

  // Cerrar al pulsar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Abrir automáticamente si se proporciona parámetro en URL o hash
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get('video');
    if (videoParam && iaData[videoParam]) {
      setTimeout(() => openModal(videoParam), 350);
    } else if (window.location.hash.startsWith('#video-')) {
      const hashVideo = window.location.hash.replace('#video-', '');
      if (iaData[hashVideo]) {
        setTimeout(() => openModal(hashVideo), 350);
      }
    }
  } catch {
    // Ignore URL parse error
  }
}
