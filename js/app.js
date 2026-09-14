/* ==========================================================================
   MENTORA COLLEGE - INTERACTIVE APPLICATION CONTROLLER
   Gestión de componentes interactivos, tabs, acordiones y drawer móvil
   ========================================================================== */

import { renderHeroMockup, renderActorPreview } from './mockups.js';
import { initLeadForm } from './lead-form.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Hero Mockup
  const heroMockupContainer = document.getElementById('heroMockupSlot');
  if (heroMockupContainer) {
    heroMockupContainer.innerHTML = renderHeroMockup();
  }

  // 2. Mobile Drawer Navigation
  const drawerToggleBtn = document.getElementById('mobileDrawerToggle');
  const mobileDrawer = document.getElementById('mobileDrawerNav');

  if (drawerToggleBtn && mobileDrawer) {
    drawerToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        mobileDrawer.classList.remove('is-open');
        drawerToggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('is-open');
        drawerToggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close drawer on link click
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
      });
    });
  }

  // 3. Actor Tabs Switcher
  const actorTabBtns = document.querySelectorAll('.actor-tab-btn');
  const actorPreviewSlot = document.getElementById('actorPreviewSlot');

  if (actorTabBtns.length > 0 && actorPreviewSlot) {
    // Initial render
    actorPreviewSlot.innerHTML = renderActorPreview('directivos');

    actorTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        actorTabBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const actorKey = btn.getAttribute('data-actor');
        actorPreviewSlot.innerHTML = renderActorPreview(actorKey);
      });
    });
  }

  // 4. Ecosystem Step Visualizer
  const flowSteps = document.querySelectorAll('.flow-step');
  const ecosystemDetailSlot = document.getElementById('ecosystemDetailSlot');

  const stepDetails = {
    planifica: {
      title: '1. PLANIFICA',
      subtitle: 'Conecta competencias, capacidades, criterios y evidencias',
      desc: 'El docente estructura unidades y sesiones alineadas al currículo institucional (CNEB o internacional) asegurando la trazabilidad de cada aprendizaje.'
    },
    ensena: {
      title: '2. ENSEÑA',
      subtitle: 'Recursos dinámicos y apoyo constante en el aula',
      desc: 'Acceso a materiales pedagógicos organizados, herramientas interactivas e Inteligencia Artificial como asistente docente para diversificar la enseñanza.'
    },
    evalua: {
      title: '3. EVALÚA',
      subtitle: 'Organiza evidencias y criterios con IA de apoyo',
      desc: 'Registra evaluaciones formativas y sumativas relacionando actividades con niveles de logro y optimizando el tiempo de revisión.'
    },
    retroalimenta: {
      title: '4. RETROALIMENTA',
      subtitle: 'Orientaciones claras para el crecimiento del estudiante',
      desc: 'Genera comentarios oportunos que ayudan al alumno a comprender qué ha logrado y cómo superar sus brechas académicas.'
    },
    monitorea: {
      title: '5. MONITOREA',
      subtitle: 'Analítica en tiempo real para coordinadores y directivos',
      desc: 'Convierte los resultados individuales y grupales en indicadores de logro para identificar alertas tempranas y tomar decisiones.'
    },
    mejora: {
      title: '6. MEJORA',
      subtitle: 'Ciclo continuo de fortalecimiento institucional',
      desc: 'Las decisiones basadas en datos permiten ajustar las planificaciones futuras, capacitar docentes y garantizar la calidad educativa.'
    }
  };

  if (flowSteps.length > 0 && ecosystemDetailSlot) {
    flowSteps.forEach(step => {
      step.addEventListener('click', () => {
        flowSteps.forEach(s => s.classList.remove('is-active'));
        step.classList.add('is-active');

        const stepKey = step.getAttribute('data-step');
        const detail = stepDetails[stepKey] || stepDetails.planifica;

        ecosystemDetailSlot.innerHTML = `
          <div style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 1.5rem; color: #FFFFFF;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #16BDEB; text-transform: uppercase; margin-bottom: 0.25rem;">${detail.title}</div>
            <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem; font-family: 'Sora', sans-serif;">${detail.subtitle}</h4>
            <p style="font-size: 0.95rem; color: #CBD5E1; line-height: 1.6;">${detail.desc}</p>
          </div>
        `;
      });
    });
  }

  // 5. FAQ Accordion Handler
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isOpen = faqItem.classList.contains('is-open');

      // Close all items
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('is-open'));

      // If wasn't open, open it
      if (!isOpen) {
        faqItem.classList.add('is-open');
      }
    });
  });

  // 6. Initialize Lead Modal & Forms
  initLeadForm();
});
