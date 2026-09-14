/* ==========================================================================
   MENTORA COLLEGE - PLATFORM UI MOCKUP RENDERER
   Genera visualizaciones de plataforma dinámicas para el Hero, Monitoreo y Tabs de Actores
   ========================================================================== */

export function renderHeroMockup() {
  return `
    <div class="platform-mockup">
      <div class="mockup-header">
        <div class="mockup-dots">
          <span class="mockup-dot dot-red"></span>
          <span class="mockup-dot dot-yellow"></span>
          <span class="mockup-dot dot-green"></span>
        </div>
        <div style="margin-left: 1rem; font-size: 0.75rem; color: #64748B; background: rgba(255,255,255,0.06); padding: 2px 12px; border-radius: 4px;">
          app.mentoracollege.edu / dashboard / competencias
        </div>
      </div>
      
      <div class="mockup-body">
        <!-- Top Bar inside platform -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div>
            <div style="font-weight: 700; color: #FFFFFF; font-size: 1.05rem;">Dashboard de Logro de Competencias</div>
            <div style="font-size: 0.75rem; color: #94A3B8;">Colegio San Agustín · Nivel Secundaria · Bimestre III</div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span style="background: rgba(86, 50, 232, 0.2); color: #A78BFA; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; border: 1px solid rgba(167, 139, 250, 0.3);">
              ✨ Asistente IA Activo
            </span>
          </div>
        </div>

        <!-- Metrics Row -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: #94A3B8;">Estudiantes Evaluados</div>
            <div style="font-size: 1.35rem; font-weight: 700; color: #38BDF8;">1,240 <span style="font-size: 0.75rem; color: #34D399;">(100%)</span></div>
          </div>
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: #94A3B8;">Logro Destacado (AD)</div>
            <div style="font-size: 1.35rem; font-weight: 700; color: #A78BFA;">38.4%</div>
          </div>
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 0.75rem; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: #94A3B8;">Tiempo Ahorrado Docente</div>
            <div style="font-size: 1.35rem; font-weight: 700; color: #34D399;">+14 hrs/mes</div>
          </div>
        </div>

        <!-- Visual Analytics Graph simulation -->
        <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 1rem; border: 1px solid rgba(255,255,255,0.06);">
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.5rem;">
            <span>Competencia: Indaga mediante métodos científicos</span>
            <span style="color: #38BDF8; font-weight: 600;">89% Alumnos en Logrado/Destacado</span>
          </div>
          
          <!-- Progress bar -->
          <div style="height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; display: flex;">
            <div style="width: 38%; background: #A78BFA;" title="Destacado (AD)"></div>
            <div style="width: 51%; background: #38BDF8;" title="Logrado (A)"></div>
            <div style="width: 8%; background: #FBBF24;" title="En Proceso (B)"></div>
            <div style="width: 3%; background: #F87171;" title="En Inicio (C)"></div>
          </div>

          <div style="display: flex; gap: 1rem; font-size: 0.7rem; color: #94A3B8; margin-top: 0.6rem;">
            <span><strong style="color: #A78BFA;">■</strong> AD: 38%</span>
            <span><strong style="color: #38BDF8;">■</strong> A: 51%</span>
            <span><strong style="color: #FBBF24;">■</strong> B: 8%</span>
            <span><strong style="color: #F87171;">■</strong> C: 3%</span>
          </div>
        </div>
      </div>

      <!-- Floating badges for credibility -->
      <div class="floating-card floating-card-1">
        <div style="background: #ECFDF5; color: #059669; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">⚡</div>
        <div>
          <div style="font-size: 0.85rem; font-weight: 700; color: #0F172A;">Planificación Alineada</div>
          <div style="font-size: 0.75rem; color: #64748B;">Competencias y Criterios CNEB</div>
        </div>
      </div>

      <div class="floating-card floating-card-2">
        <div style="background: #F0F5FF; color: #3267E8; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">🤖</div>
        <div>
          <div style="font-size: 0.85rem; font-weight: 700; color: #0F172A;">Retroalimentación IA</div>
          <div style="font-size: 0.75rem; color: #64748B;">Sugerencias pedagógicas automáticas</div>
        </div>
      </div>
    </div>
  `;
}

export function renderActorPreview(actorKey) {
  const views = {
    directivos: `
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1.5rem; box-shadow: 0 10px 25px rgba(23,33,61,0.06);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span class="badge badge-purple">Vista Directiva · Consolidado Institucional</span>
          <span style="font-size: 0.8rem; color: #64748B;">Actualizado en tiempo real</span>
        </div>
        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; font-family: 'Sora', sans-serif;">Panel de Brechas y Decisiones Académicas</h4>
        <p style="font-size: 0.9rem; color: #64748B; margin-bottom: 1.25rem;">Directores y coordinadores visualizan el avance por grados, áreas y niveles de logro para intervenir oportunamente.</p>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 1rem; border-radius: 10px;">
            <div style="font-size: 0.8rem; font-weight: 600; color: #17213D;">Matemática · 3er Año Secundaria</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #3267E8; margin: 0.25rem 0;">92% Logro Esperado</div>
            <div style="font-size: 0.75rem; color: #059669;">+8% respecto al bimestre anterior</div>
          </div>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 1rem; border-radius: 10px;">
            <div style="font-size: 0.8rem; font-weight: 600; color: #17213D;">Comunicación · 1er Año Secundaria</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #D97706; margin: 0.25rem 0;">14% Alumnos en Refuerzo</div>
            <div style="font-size: 0.75rem; color: #D97706;">Alerta pedagógica emitida a docentes</div>
          </div>
        </div>
      </div>
    `,
    docentes: `
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1.5rem; box-shadow: 0 10px 25px rgba(23,33,61,0.06);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span class="badge badge-blue">Vista Docente · Asistente de Aula</span>
          <span style="font-size: 0.8rem; color: #64748B;">Planificación + IA integradas</span>
        </div>
        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; font-family: 'Sora', sans-serif;">Gestión de Sesiones e Rúbricas Automatizadas</h4>
        <p style="font-size: 0.9rem; color: #64748B; margin-bottom: 1.25rem;">Menos carga administrativa: el docente diseña actividades, aprueba sugerencias de IA y evalúa por rúbricas en segundos.</p>

        <div style="background: #F1F5F9; border-left: 4px solid #5632E8; padding: 1rem; border-radius: 8px;">
          <div style="font-size: 0.85rem; font-weight: 600; color: #5632E8;">🤖 Sugerencia pedagógica de IA (Revisada por el docente):</div>
          <p style="font-size: 0.825rem; color: #334155; margin-top: 0.25rem;">"Se generó una lista de cotejo para evaluar la capacidad 'Argumenta explicaciones científicas' alineada a la sesión N° 4."</p>
        </div>
      </div>
    `,
    estudiantes: `
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1.5rem; box-shadow: 0 10px 25px rgba(23,33,61,0.06);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span class="badge badge-cyan">Vista Estudiante · Portal del Aprendiz</span>
          <span style="font-size: 0.8rem; color: #64748B;">Retroalimentación formativa</span>
        </div>
        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; font-family: 'Sora', sans-serif;">Autoevaluación y Metas Claras de Mejora</h4>
        <p style="font-size: 0.9rem; color: #64748B; margin-bottom: 1.25rem;">El estudiante comprende exactamente qué logró y qué pasos específicos dar para seguir creciendo en cada área.</p>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 1rem; border-radius: 10px; display: flex; align-items: center; gap: 1rem;">
          <div style="font-size: 2rem;">🏆</div>
          <div>
            <div style="font-size: 0.9rem; font-weight: 700; color: #17213D;">Proyecto de Indagación Científica</div>
            <div style="font-size: 0.8rem; color: #059669; font-weight: 600;">Nivel Alcanzado: Logro Destacado (AD)</div>
            <div style="font-size: 0.75rem; color: #64748B;">"Excelente sustento de variables en tus experimentos."</div>
          </div>
        </div>
      </div>
    `,
    familias: `
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 1.5rem; box-shadow: 0 10px 25px rgba(23,33,61,0.06);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span class="badge badge-magenta">Vista Familias · App Mentora Comunica</span>
          <span style="font-size: 0.8rem; color: #64748B;">Canal directo e informado</span>
        </div>
        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; font-family: 'Sora', sans-serif;">Comunicación, Asistencia y Boletas en la Palma de la Mano</h4>
        <p style="font-size: 0.9rem; color: #64748B; margin-bottom: 1.25rem;">Padres y apoderados reciben notificadores oportunos de asistencia, avisos institucionales y avance académico sin intermediarios.</p>

        <div style="display: flex; gap: 0.75rem;">
          <div style="flex: 1; background: #EEF2FF; padding: 0.75rem; border-radius: 8px; border: 1px solid #C7D2FE;">
            <div style="font-size: 0.75rem; font-weight: 600; color: #3730A3;">📲 Notificación de Asistencia</div>
            <div style="font-size: 0.8rem; color: #1E1B4B; margin-top: 0.25rem;">Ingreso registrado: 07:45 AM</div>
          </div>
          <div style="flex: 1; background: #F0FDF4; padding: 0.75rem; border-radius: 8px; border: 1px solid #BBF7D0;">
            <div style="font-size: 0.75rem; font-weight: 600; color: #166534;">📄 Boleta Digital Disponible</div>
            <div style="font-size: 0.8rem; color: #064E3B; margin-top: 0.25rem;">Bimestre III firmado electrónicamente</div>
          </div>
        </div>
      </div>
    `
  };

  return views[actorKey] || views.directivos;
}
