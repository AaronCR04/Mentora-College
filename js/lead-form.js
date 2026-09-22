/* ==========================================================================
   MENTORA COLLEGE - LEAD CONVERSION & MODAL CONTROLLER
   Gestión de la conversión comercial, validación de formularios y eventos
   ========================================================================== */

function closeModal(targetModal) {
  const modal = targetModal || document.getElementById('leadModalOverlay') || document.querySelector('.modal-overlay.is-open');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function openModal() {
  const modalOverlay = document.getElementById('leadModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

export function initLeadForm() {
  const leadForms = document.querySelectorAll('.lead-form-element');

  // Open modal buttons - direct listeners
  document.querySelectorAll('.js-open-lead-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close modal buttons - direct listeners
  document.querySelectorAll('.modal-close, #modalCloseBtn, [data-modal-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal(btn.closest('.modal-overlay'));
    });
  });

  // Handle lead form submission
  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Procesando conversación...';
      }

      // Collect data
      const formData = new FormData(form);
      const leadPayload = {
        nombre: formData.get('nombre'),
        cargo: formData.get('cargo'),
        colegio: formData.get('colegio'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        interes: formData.get('interes'),
        mensaje: formData.get('mensaje') || ''
      };

      // Simulate tracking event & network request
      setTimeout(() => {
        console.log('✅ Lead comercial capturado con éxito:', leadPayload);

        // Render success state
        form.innerHTML = `
          <div class="success-banner">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎉</div>
            <h3 style="font-size: 1.35rem; color: #065F46; margin-bottom: 0.5rem; font-family: 'Sora', sans-serif;">¡Solicitud Recibida con Éxito!</h3>
            <p style="font-size: 0.95rem; color: #047857;">Gracias <strong>${leadPayload.nombre}</strong>. Un especialista pedagógico de Mentora College se pondrá en contacto con el colegio <strong>${leadPayload.colegio}</strong> a la brevedad para coordinar una presentación personalizada.</p>
            ${leadPayload.interes ? `
            <div style="margin-top: 1.25rem; font-size: 0.85rem; color: #065F46; background: rgba(16, 185, 129, 0.15); padding: 0.75rem; border-radius: 8px;">
              📌 Hemos registrado tu preferencia en: <strong>${leadPayload.interes}</strong>
            </div>` : ''}
          </div>
        `;

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1200);
    });
  });
}

// Global Delegated Listeners (always active regardless of DOM loading timing)
document.addEventListener('click', (e) => {
  // Delegate click for opening modal
  const openTrigger = e.target.closest('.js-open-lead-modal');
  if (openTrigger) {
    e.preventDefault();
    openModal();
    return;
  }

  // Delegate click for closing modal
  const closeTrigger = e.target.closest('.modal-close, #modalCloseBtn, [data-modal-close]');
  if (closeTrigger) {
    e.preventDefault();
    e.stopPropagation();
    closeModal(closeTrigger.closest('.modal-overlay'));
    return;
  }

  // Click on modal overlay backdrop
  if (e.target && e.target.classList && e.target.classList.contains('modal-overlay')) {
    closeModal(e.target);
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLeadForm);
} else {
  initLeadForm();
}
