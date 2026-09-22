# Mentora College - Página Web Institucional y Comercial (V1.0)

Este repositorio contiene el código fuente completo de la plataforma web institucional y comercial de **Mentora College**, desarrollada en estricto cumplimiento del Brief Integral UX/UI, Frontend, SEO, Responsive, Performance y Conversión (14 de septiembre de 2026).

---

## 🚀 Arquitectura y Tecnologías

- **HTML5 Semántico**: Estructura limpia y accesible con marcado optimizado para motores de búsqueda (SEO).
- **CSS3 Design System (Vanilla Tokens)**: Paleta institucional (`#F7F9FC`, `#17213D`, `#3267E8`, `#5632E8`, `#17164D`, `#16BDEB`, `#B313B8`) basada en la regla de color 70% superficie clara / 20% institucional / 10% acentos.
- **Tipografía Google Fonts**: `Sora` (Encabezados H1-H3 y métricas) + `Inter` (Cuerpo, descripciones y botones).
- **JavaScript Modular (ES Modules)**: Componentes interactivos dinámicos sin sobrecarga de frameworks pesados (Core Web Vitals óptimos).
- **SEO & Metadatos**: `sitemap.xml`, `robots.txt`, etiquetas Open Graph, Twitter Cards y marcado de datos estructurados JSON-LD (`SoftwareApplication`).

---

## 📂 Estructura del Proyecto

```
mentora-college/
├── index.html                           # Home Page con las 16 secciones obligatorias
├── 404.html                             # Página de error 404 personalizada
├── styles/
│   └── main.css                         # Tokens de diseño, tipografías, variables y componentes
├── js/
│   ├── app.js                           # Controlador interactivo (Tabs, Ecosistema, FAQ, Menu Drawer)
│   ├── lead-form.js                     # Gestión del formulario de conversión y modal de lead
│   └── mockups.js                       # Renderizador de interfaces y dashboards de la plataforma
├── robots.txt                           # Configuración para rastreadores de búsqueda
├── sitemap.xml                          # Mapa del sitio XML con todas las rutas
├── README.md                            # Guía del proyecto y checklist de QA
└── [10 Landings SEO Internas]/
    ├── gestion-educativa-colegios/index.html
    ├── planificacion-evaluacion-competencias/index.html
    ├── inteligencia-artificial-educacion/index.html
    ├── monitoreo-aprendizaje/index.html
    ├── comunicacion-familias/index.html
    ├── asistencia-escolar/index.html
    ├── gestion-evaluaciones/index.html
    ├── evaluacion-con-ia/index.html
    ├── casos-de-exito/index.html
    └── recursos/index.html
```

---

## 🛠️ Instrucciones de Instalación y Ejecución Local

No requiere de instalaciones pesadas de `node_modules`. Puedes ejecutar el sitio localmente usando cualquier servidor estático web de Node.js o Python:

### Opción 1: Servidor estático con Node / npx
```bash
npx serve ./
# o
npx http-server ./
```

### Opción 2: Servidor con Python 3
```bash
python -m http.server 8000
```
Luego abre `http://localhost:8000` en tu navegador.

---

## ⚙️ Variables de Entorno y Configuración para Producción

Para la integración en producción con el CRM o herramienta de analítica escolar:

```env
# URL base de producción
VITE_SITE_URL=https://mentoracollege.edu

# Webhook o API de captación de leads comercial
VITE_LEAD_WEBHOOK_URL=https://api.mentoracollege.edu/v1/leads

# ID de seguimiento de analítica (Google Analytics 4 / Tag Manager)
VITE_GA_TRACKING_ID=G-MENTORA2026
```

---

## ✅ Checklist Final de QA (Aceptación del Proyecto)

### 🎨 Diseño y Sistema Visual
- [x] Respeto estricto del 70% fondos claros (`#F7F9FC`), 20% institucional (`#17164D`/`#5632E8`/`#3267E8`) y 10% acentos (`#16BDEB`, `#B313B8`).
- [x] Tipografías oficiales aplicadas: `Sora` (700/600) para H1-H3 y métricas, `Inter` para cuerpo y controles.
- [x] Sin blanco puro en el fondo continuo (reservado exclusivamente para tarjetas e insumos).
- [x] Botón principal con degradado morado-azul, bordes redondeados (10-12px) e interacción hover.

### 📱 Responsive & UX
- [x] Header sticky transparente con blur en desktop y menú drawer accesible en dispositivos móviles.
- [x] Adaptación completa sin solapamientos en dispositivos móviles (375px), tablets (768px) y monitores (1280px+).
- [x] Botones y zonas de toque con tamaño cómodo (mínimo 44px de altura táctil).

### 🔍 SEO Técnico On-Page
- [x] Un único encabezado `<H1>` por página.
- [x] Encabezados `<H2>` y `<H3>` estructurados jerárquicamente.
- [x] Las 10 landings internas de SEO creadas y enlazadas contextualmente en la Home y Footer.
- [x] Archivo `sitemap.xml` y `robots.txt` validados en la raíz del proyecto.
- [x] Marcado JSON-LD de `SoftwareApplication` para enriquecer snippets de búsqueda.

### ⚡ Rendimiento & Accesibilidad (Core Web Vitals)
- [x] LCP ≤ 2.5 s / INP ≤ 200 ms / CLS ≤ 0.1.
- [x] Contraste suficiente acorde al estándar WCAG AA en textos y botones.
- [x] Acordiones FAQ y modal de contacto operables mediante teclado con foco visible.

---

## 📞 Soporte e Información Institucional
- **Sitio oficial**: [https://mentoracollege.edu](https://mentoracollege.edu)
- **Contacto comercial**: contacto@mentoracollege.edu
- **Atención telefónica**: +51 (1) 700-8800
# Mentora-College
