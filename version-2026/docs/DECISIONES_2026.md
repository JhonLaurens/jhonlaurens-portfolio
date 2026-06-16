# Decisiones de diseño y cumplimiento

## Inspiracion de portafolios

La dirección visual toma patrones comunes en portafolios reconocidos: claridad inmediata, selección corta de proyectos, personalidad profesional y evidencia concreta antes que exceso de texto. La página evita convertir el inicio en una biografía larga y mueve el contacto cerca del inicio.

## Migracion de contenido

La versión anterior se usó como fuente, no como plantilla. Se migraron los temas que aportan credibilidad real:

- Data Engineering, bases de datos y validación de información.
- Experiencia en entorno financiero y soporte a iniciativas de core bancario.
- Seguridad de la información, DLP, ISO 27001 como contexto de trabajo y criterio técnico.
- Automatización con Python, SQL y reportes.
- Formulario conectado a PostgreSQL/Supabase.

Se descartaron o suavizaron:

- Referencias personales, teléfonos y correos de terceros.
- Textos heredados de SnapFolio, lorem ipsum, dropdowns y páginas detalle genéricas.
- Métricas no verificables públicamente como promesa de marketing. Cuando el dato puede ser sensible o no demostrable, se reemplaza por una descripción prudente del tipo de experiencia.
- Listas largas de habilidades con porcentajes, porque pueden sonar arbitrarias y distraen del trabajo real.

## SEO

Se aplicó una arquitectura multipágina con HTML por ruta, títulos y descripciones específicas, URLs descriptivas, `robots.txt` y `sitemap.xml`. La navegación es rastreable y el contenido principal queda disponible sin depender de una SPA pesada.

Referencia: Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

Cada página mantiene un único `h1`, canonical, Open Graph básico, Twitter Cards y datos estructurados mínimos. La redacción evita keyword stuffing y prioriza claridad para personas: datos, IA aplicada, automatización, seguridad y documentación aparecen cuando explican una capacidad real.

## Accesibilidad

La base usa estructura semántica, foco visible, enlaces de salto, labels explícitos, contraste alto y soporte para `prefers-reduced-motion`.

Referencia: WCAG 2.2: https://www.w3.org/TR/WCAG22/

Los formularios mantienen labels visibles, `role="status"` para respuesta de envío y campos con restricciones de longitud alineadas con la API.

## Seguridad

El formulario no expone credenciales en el navegador. La API serverless valida longitud, email y asunto; usa consultas parametrizadas y escribe con `source = portfolio-website-v2`. Vercel aplica cabeceras de seguridad, incluyendo CSP, `nosniff`, `frame-ancestors` y politica de permisos.

Referencia: OWASP Top Ten: https://owasp.org/www-project-top-ten/

No se publican secretos, valores de `.env` ni datos de contacto de terceros. La página de contacto advierte que no se deben incluir credenciales ni datos sensibles en el mensaje.

## Despliegue

La app está lista para usarse como root de proyecto Vercel dentro de `version-2026/`. El build usa Vite y genera HTML estático más una función en `/api/contact`.

Referencia: Vercel Vite Frameworks: https://vercel.com/docs/frameworks/frontend/vite

## Traduccion

El contenido fuente queda en español neutro, con frases cortas y términos técnicos consistentes. Para una versión inglesa se recomienda traducir por bloques de página, no palabra por palabra, manteniendo la intención: resultados, evidencia, seguridad y acción.

## UX writing

Se redujo la cantidad de texto por pantalla y se priorizaron rutas claras:

- Home: propuesta de valor y formulario temprano.
- Servicios: problemas que se pueden contratar o conversar.
- Proyectos: casos con contexto, reto, solución y resultado.
- Documentacion: gobierno, seguridad e IA responsable.
- Sobre mí: perfil humano y técnico, sin exageraciones.
- Contacto: instrucciones simples para iniciar la conversación.
