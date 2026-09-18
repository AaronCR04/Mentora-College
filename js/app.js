/* ==========================================================================
   MENTORA COLLEGE - INTERACTIVE APPLICATION CONTROLLER
   Gestión de componentes interactivos, tabs, acordiones y drawer móvil
   ========================================================================== */

import { renderHeroMockup, renderActorPreview } from './mockups.js';
import { initLeadForm } from './lead-form.js';
import { initEcosistemaScrolly } from './ecosistema-scrolly.js';

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

  // 4. Ecosystem Scrollytelling Experience (GSAP + ScrollTrigger)
  initEcosistemaScrolly();

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

  // 7. Sticky Header Scroll Effect (Smooth White Glass on Scroll)
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});
