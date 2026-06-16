# Decisiones de diseno y cumplimiento

## Inspiracion de portafolios

La direccion visual toma patrones comunes en portafolios reconocidos: claridad inmediata, seleccion corta de proyectos, personalidad profesional y evidencia concreta antes que exceso de texto. La pagina evita convertir el inicio en una biografia larga y mueve el contacto cerca del inicio.

## SEO

Se aplico una arquitectura multipagina con HTML por ruta, titulos y descripciones especificas, URLs descriptivas, `robots.txt` y `sitemap.xml`. La navegacion es rastreable y el contenido principal queda disponible sin depender de una SPA pesada.

Referencia: Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Accesibilidad

La base usa estructura semantica, foco visible, enlaces de salto, labels explicitos, contraste alto y soporte para `prefers-reduced-motion`.

Referencia: WCAG 2.2: https://www.w3.org/TR/WCAG22/

## Seguridad

El formulario no expone credenciales en el navegador. La API serverless valida longitud, email y asunto; usa consultas parametrizadas y escribe con `source = portfolio-website-v2`. Vercel aplica cabeceras de seguridad, incluyendo CSP, `nosniff`, `frame-ancestors` y politica de permisos.

Referencia: OWASP Top Ten: https://owasp.org/www-project-top-ten/

## Despliegue

La app esta lista para usarse como root de proyecto Vercel dentro de `version-2026/`. El build usa Vite y genera HTML estatico mas una funcion en `/api/contact`.

Referencia: Vercel Vite Frameworks: https://vercel.com/docs/frameworks/frontend/vite

## Traduccion

El contenido fuente queda en espanol neutro, con frases cortas y terminos tecnicos consistentes. Para una version inglesa se recomienda traducir por bloques de pagina, no palabra por palabra, manteniendo la intencion: resultados, evidencia, seguridad y accion.
