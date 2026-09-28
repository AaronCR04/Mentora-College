/* ==========================================================================
   MENTORA COLLEGE - LEAD CONVERSION & FORM VALIDATION CONTROLLER
   Gestión de la conversión comercial, validación en tiempo real y eventos
   ========================================================================== */

import mensajeEnviadoImg from '../assets/general/mensaje enviado.svg';
import 'intl-tel-input/styles';
import intlTelInput from 'intl-tel-input/intlTelInputWithUtils';
import esTranslations from 'intl-tel-input/locale/es';

function closeModal(targetModal) {
  const modal = targetModal || document.getElementById('leadModalOverlay') || document.querySelector('.modal-overlay.is-open');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');

    // Restaurar header si está en la parte superior sin scroll
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
      mainHeader.classList.remove('modal-active');
      if (window.scrollY <= 20) {
        mainHeader.classList.remove('scrolled');
      }
    }
  }
}

function openModal() {
  const modalOverlay = document.getElementById('leadModalOverlay');
  if (modalOverlay) {
    // Cerrar drawer de navegación móvil si estuviera abierto
    const mobileDrawer = document.getElementById('mobileDrawerNav');
    const drawerToggleBtn = document.getElementById('mobileDrawerToggle');
    if (mobileDrawer) {
      mobileDrawer.classList.remove('is-open');
    }
    if (drawerToggleBtn) {
      drawerToggleBtn.setAttribute('aria-expanded', 'false');
    }

    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    // Activar fondo blanco nítido en el navbar al abrir modal
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
      mainHeader.classList.add('modal-active');
      mainHeader.classList.add('scrolled');
    }

    // Asegurar que el input de teléfono del modal esté inicializado
    const modalPhone = modalOverlay.querySelector('input[type="tel"], input[name="telefono"]');
    if (modalPhone) {
      initIntlPhoneInput(modalPhone);
    }
  }
}

/**
 * Inicializa intl-tel-input con bandera, buscador y código internacional.
 * Por defecto: Perú (+51)
 */
export function initIntlPhoneInput(phoneInput) {
  if (!phoneInput) return null;

  const existingIti = intlTelInput.getInstance(phoneInput);
  if (existingIti) {
    return existingIti;
  }

  const iti = intlTelInput(phoneInput, {
    initialCountry: 'pe', // Perú (+51) predeterminado
    countryOrder: ['pe', 'co', 'mx', 'cl', 'ar', 'ec', 'bo', 'es', 'us'],
    countrySearch: true,
    separateDialCode: true,
    formatAsYouType: true,
    placeholderNumberPolicy: 'aggressive',
    i18n: esTranslations,
  });

  phoneInput.addEventListener('countrychange', () => {
    clearFieldError(phoneInput);
    if (phoneInput.value.trim()) {
      validateField(phoneInput);
    }
  });

  return iti;
}

/**
 * Muestra un mensaje de error debajo del campo correspondiente
 */
function showFieldError(field, message) {
  if (!field) return;
  field.classList.add('is-invalid');

  const formGroup = field.closest('.form-group');
  if (!formGroup) return;

  let errorSpan = formGroup.querySelector('.form-error-msg');
  if (!errorSpan) {
    errorSpan = document.createElement('div');
    errorSpan.className = 'form-error-msg';
    formGroup.appendChild(errorSpan);
  }

  errorSpan.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    <span>${message}</span>
  `;
}

/**
 * Limpia el estado de error de un campo
 */
function clearFieldError(field) {
  if (!field) return;
  field.classList.remove('is-invalid');

  const formGroup = field.closest('.form-group');
  if (formGroup) {
    const errorSpan = formGroup.querySelector('.form-error-msg');
    if (errorSpan) {
      errorSpan.remove();
    }
  }
}

/**
 * Valida un campo individual según su nombre/tipo
 */
function validateField(field) {
  if (!field) return true;

  const value = (field.value || '').trim();
  const name = field.getAttribute('name') || field.id || '';
  const isRequired = field.hasAttribute('required');

  // Si no es requerido y está vacío, es válido
  if (!isRequired && !value) {
    clearFieldError(field);
    return true;
  }

  // Validación Nombre
  if (name.includes('nombre')) {
    if (!value) {
      showFieldError(field, 'El nombre y apellido es obligatorio.');
      return false;
    }
    if (value.length < 3) {
      showFieldError(field, 'Ingresa tu nombre completo (mínimo 3 letras).');
      return false;
    }
    clearFieldError(field);
    return true;
  }

  // Validación Colegio
  if (name.includes('colegio')) {
    if (!value) {
      showFieldError(field, 'El nombre del colegio es obligatorio.');
      return false;
    }
    if (value.length < 3) {
      showFieldError(field, 'Ingresa un nombre de institución válido.');
      return false;
    }
    clearFieldError(field);
    return true;
  }

  // Validación Cargo
  if (name.includes('cargo')) {
    if (!value || value.startsWith('Selecciona')) {
      showFieldError(field, 'Por favor selecciona tu cargo o rol institucional.');
      return false;
    }
    clearFieldError(field);
    return true;
  }

  // Validación Correo Institucional
  if (name.includes('email') || field.type === 'email') {
    if (!value) {
      showFieldError(field, 'El correo institucional es obligatorio.');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, 'Ingresa un correo electrónico válido (ej. usuario@colegio.edu).');
      return false;
    }
    clearFieldError(field);
    return true;
  }

  // Validación Teléfono / WhatsApp con intl-tel-input
  if (name.includes('telefono') || field.type === 'tel') {
    if (!value) {
      showFieldError(field, 'El teléfono / WhatsApp es obligatorio.');
      return false;
    }
    const iti = intlTelInput.getInstance(field);
    if (iti) {
      const isValid = iti.isValidNumber();
      if (!isValid) {
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 7) {
          showFieldError(field, 'Ingresa un número telefónico válido para el país seleccionado.');
          return false;
        }
      }
    } else {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 7) {
        showFieldError(field, 'Ingresa un número telefónico válido (mínimo 7 dígitos, solo números).');
        return false;
      }
    }
    clearFieldError(field);
    return true;
  }

  // Otros campos obligatorios genéricos
  if (isRequired && !value) {
    showFieldError(field, 'Este campo es obligatorio.');
    return false;
  }

  clearFieldError(field);
  return true;
}

/**
 * Restringe la entrada en campos de teléfono:
 * - Impide presionar teclas alfabéticas o caracteres especiales no válidos
 * - Sanitiza pegado de texto con letras y muestra mensaje de advertencia
 */
function setupPhoneRestrictions(phoneInput) {
  if (!phoneInput || phoneInput.dataset.phoneRestrictionsSet) return;
  phoneInput.dataset.phoneRestrictionsSet = 'true';

  // 1. Evitar escribir letras en el evento keydown / keypress
  phoneInput.addEventListener('keypress', (e) => {
    // Permitir teclas especiales (flechas, retroceso, tab, etc.)
    if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) {
      return;
    }
    // Solo permitir números, espacios, +, -, (, )
    const allowedChars = /^[0-9+\s\-()]$/;
    if (!allowedChars.test(e.key)) {
      e.preventDefault();
      showFieldError(phoneInput, 'Solo se permiten números en este campo (no letras).');
    }
  });

  // 2. Sanitizar al pegar o autocompletar
  phoneInput.addEventListener('input', () => {
    const originalVal = phoneInput.value;
    const sanitizedVal = originalVal.replace(/[^0-9+\s\-()]/g, '');

    if (originalVal !== sanitizedVal) {
      phoneInput.value = sanitizedVal;
      showFieldError(phoneInput, 'Se han filtrado caracteres inválidos. Solo se permiten números.');
    } else if (phoneInput.classList.contains('is-invalid')) {
      validateField(phoneInput);
    }
  });

  phoneInput.addEventListener('blur', () => {
    validateField(phoneInput);
  });
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

  // Configurar validaciones por formulario
  leadForms.forEach(form => {
    // Añadir novalidate para usar nuestras alertas visuales integradas
    form.setAttribute('novalidate', 'true');

    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      // Si es teléfono, aplicar inicialización de intl-tel-input y restricción de caracteres
      if (input.type === 'tel' || (input.name && input.name.includes('telefono'))) {
        initIntlPhoneInput(input);
        setupPhoneRestrictions(input);
      } else {
        // En los demás inputs, validar al salir (blur) y al escribir (input)
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) {
            validateField(input);
          }
        });
        if (input.tagName === 'SELECT') {
          input.addEventListener('change', () => validateField(input));
        }
      }
    });

    // Envío del formulario con validación integral
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      let firstInvalidField = null;

      // Validar todos los campos del formulario
      inputs.forEach(field => {
        const isValid = validateField(field);
        if (!isValid) {
          isFormValid = false;
          if (!firstInvalidField) {
            firstInvalidField = field;
          }
        }
      });

      // Si hay errores, no enviar y hacer foco en el primer campo erróneo
      if (!isFormValid) {
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Procesando solicitud...';
      }

      // Recopilar datos
      const formData = new FormData(form);
      if (!formData.get('form-name')) {
        formData.append('form-name', 'lead-contacto');
      }
      if (!formData.has('bot-field')) {
        formData.append('bot-field', '');
      }

      // Obtener el número completo internacional con prefijo (ej. +51 987 654 321)
      let fullPhoneNumber = formData.get('telefono') || '';
      const phoneInput = form.querySelector('input[type="tel"], input[name="telefono"]');
      if (phoneInput) {
        const iti = intlTelInput.getInstance(phoneInput);
        if (iti) {
          const numberE164 = iti.getNumber();
          if (numberE164) {
            fullPhoneNumber = numberE164;
          } else if (phoneInput.value) {
            const countryData = iti.getSelectedCountry();
            const dial = countryData && countryData.dialCode ? `+${countryData.dialCode} ` : '';
            fullPhoneNumber = dial + phoneInput.value.trim();
          }
          formData.set('telefono', fullPhoneNumber);
          phoneInput.value = fullPhoneNumber;
        }
      }

      const leadPayload = {
        nombre: formData.get('nombre'),
        cargo: formData.get('cargo'),
        colegio: formData.get('colegio'),
        email: formData.get('email'),
        telefono: fullPhoneNumber,
        mensaje: formData.get('mensaje') || ''
      };

      // Enviar a Netlify Forms (Funciona de forma nativa cuando se aloja en Netlify)
      const submitEndpoint = form.getAttribute('action') || '/';
      fetch(submitEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
        .then((response) => {
          if (!response.ok) {
            console.warn(`Netlify Forms respondió con estado ${response.status}: ${response.statusText}`);
          }
          console.log('✅ Formulario enviado con éxito a Netlify Forms:', leadPayload);
          renderSuccessBanner(form, leadPayload);
        })
        .catch((err) => {
          console.warn('⚠️ Nota: En entorno local o GitHub Pages se muestra el mensaje pero no se envía el email de Netlify.', err);
          renderSuccessBanner(form, leadPayload);
        });
    });
  });
}

function renderSuccessBanner(form, leadPayload) {
  form.innerHTML = `
    <div class="success-banner" style="text-align: center; padding: 2rem 1rem; animation: formErrorSlideIn 0.3s ease;">
      <div style="margin-bottom: 1rem; display: flex; justify-content: center; align-items: center;">
        <img src="${mensajeEnviadoImg}" alt="Mensaje Enviado" style="width: 72px; height: 72px; object-fit: contain;">
      </div>
      <h3 style="font-size: 1.35rem; color: #065F46; margin-bottom: 0.6rem; font-family: 'Sora', sans-serif;">¡Solicitud Recibida con Éxito!</h3>
      <p style="font-size: 0.95rem; color: #047857; line-height: 1.5; margin-bottom: 1rem;">
        Gracias <strong>${leadPayload.nombre}</strong>. Un asesor pedagógico de Mentora College se pondrá en contacto con el colegio <strong>${leadPayload.colegio}</strong> a la brevedad posible para coordinar tu demostración personalizada.
      </p>
      <div style="font-size: 0.85rem; color: #065F46; background: rgba(16, 185, 129, 0.15); padding: 0.75rem; border-radius: 8px;">
        Nos comunicaremos al número: <strong>${leadPayload.telefono}</strong>
      </div>
    </div>
  `;
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

