import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Plugin de inclusión y componetización de HTML para Vite
 * Permite usar:
 *   <include src="/components/header.html"></include>
 *   <include src="/components/footer.html"></include>
 *   <include src="/components/lead-modal.html"></include>
 */
function htmlIncludePlugin(): Plugin {
  return {
    name: 'html-include-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html: string, ctx) {
        const includeRegex = /<include\s+src=["']([^"']+)["']\s*(?:\/>|><\/include>)/gi
        let result = html
        let hasReplaced = true
        let depth = 0
        const maxDepth = 5

        while (hasReplaced && depth < maxDepth) {
          hasReplaced = false
          result = result.replace(includeRegex, (_match, srcPath) => {
            hasReplaced = true
            const cleanPath = srcPath.startsWith('/') ? srcPath.slice(1) : srcPath
            const resolvedPath = path.resolve(__dirname, cleanPath)
            if (fs.existsSync(resolvedPath)) {
              return fs.readFileSync(resolvedPath, 'utf-8')
            }
            console.warn(`[html-include-plugin] Warning: Component not found at ${resolvedPath}`)
            return `<!-- [Component missing: ${srcPath}] -->`
          })
          depth++
        }

        // Determinar prefijo relativo (./ para raíz, ../ para subpáginas) para soporte de GitHub Pages
        if (ctx && ctx.filename) {
          const relativeDir = path.relative(__dirname, path.dirname(ctx.filename))
          const isSubpage = relativeDir && relativeDir !== '.' && relativeDir !== ''
          const prefix = isSubpage ? '../' : './'

          // Reemplazar href="/..." (evitando // externos)
          result = result.replace(/href=["']\/(?!\/)([^"']*)["']/gi, (_m, p1) => `href="${prefix}${p1}"`)
          // Reemplazar src="/..." (evitando // externos)
          result = result.replace(/src=["']\/(?!\/)([^"']*)["']/gi, (_m, p1) => `src="${prefix}${p1}"`)
        }

        return result
      }
    },
    configureServer(server) {
      server.watcher.add(path.resolve(__dirname, 'components'))
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('components') && file.endsWith('.html')) {
        server.ws.send({ type: 'full-reload' })
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [htmlIncludePlugin()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        asistencia: path.resolve(__dirname, 'asistencia-escolar/index.html'),
        comunicacion: path.resolve(__dirname, 'comunicacion-familias/index.html'),
        planificacion: path.resolve(__dirname, 'planificacion-evaluacion-competencias/index.html'),
        evaluaciones: path.resolve(__dirname, 'gestion-evaluaciones/index.html'),
        monitoreo: path.resolve(__dirname, 'monitoreo-aprendizaje/index.html'),
        boleta: path.resolve(__dirname, 'boleta-de-notas/index.html'),
      },
    },
  },
})
