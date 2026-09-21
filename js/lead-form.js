/* ==========================================================================
   MENTORA COLLEGE - LEAD CONVERSION & MODAL CONTROLLER
   Gestión de la conversión comercial, validación de formularios y eventos
   ========================================================================== */

export function initLeadForm() {
  const leadForms = document.querySelectorAll('.lead-form-element');
  const modalOverlay = document.getElementById('leadModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.js-open-lead-modal');

  // Open modal handler
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOverlay) {
        modalOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal handler
  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

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
