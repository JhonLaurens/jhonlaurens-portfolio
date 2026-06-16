# Versión 2026

Nueva versión multipágina del portfolio profesional de Jhon Laurens. El objetivo es presentar una narrativa más clara sobre datos, IA aplicada, automatización y documentación técnica, sin copiar literalmente el portfolio anterior ni conservar contenido de plantilla.

La aplicación está preparada para Vercel y mantiene el formulario conectado al esquema `public.contacts` de Supabase/PostgreSQL mediante `/api/contact`.

## Comandos

```bash
npm install
npm run dev
npm run build
npm audit
```

## Variables de entorno

La API serverless usa variables del servidor, nunca del navegador:

- `DATABASE_URL`, recomendado en Vercel.
- Alternativa compatible con el proyecto actual: `HOST_NAME`, `DB_PORT` o `POSTGRES_PORT`, `DATABASE_NAME`, `USUARIO_NAME`, `PASS_DB`.

No se debe commitear `.env`, `.env.local` ni credenciales.

## Rutas

- `/`: propuesta de valor, enfoque y formulario temprano.
- `/servicios/`: bloques concretos de trabajo para datos, migración, automatización, IA, seguridad y documentación.
- `/proyectos/`: cuatro casos seleccionados con contexto, reto, solución y resultado prudente.
- `/documentacion/`: gobierno documental, ADR, bitácora de IA, riesgos, evidencias y despliegue.
- `/sobre-mi/`: perfil profesional humano, técnico y sin claims inflados.
- `/contacto/`: formulario principal y enlaces públicos.

## Informacion migrada

Se adaptó contenido real de la versión anterior:

- Perfil de Data Engineering, bases de datos, IA aplicada y seguridad de la información.
- Experiencia en entornos financieros, validación de datos y soporte a iniciativas de core bancario.
- Tecnologías frecuentes: SQL, PostgreSQL, Oracle, Python, JavaScript, Vite, Power BI y criterios OWASP.
- Formulario conectado a `/api/contact` con persistencia en PostgreSQL.
- Enfoque de documentación viva, seguridad y trazabilidad.

## Informacion descartada o suavizada

- Textos de plantilla como SnapFolio, lorem ipsum, servicios genéricos y páginas detalle sin personalizar.
- Referencias personales, teléfonos y correos de terceros.
- Métricas fuertes no verificables públicamente. Se reemplazaron por redacción prudente sobre experiencia en migraciones, validación e integridad.
- Exceso de contenido del CV anterior que hacía la navegación pesada y escondía el formulario.

## Criterios aplicados

- SEO: páginas HTML separadas, títulos y descripciones por ruta, canonical, Open Graph, Twitter Cards, JSON-LD mínimo, manifest web, URLs descriptivas y contenido escaneable.
- UX writing: textos breves, lenguaje claro, menos promesa y más evidencia.
- Accesibilidad: contraste alto, foco visible, estructura semántica, labels explícitos y soporte para `prefers-reduced-motion`.
- Seguridad: secretos solo en API, validación de entrada, límite de tamaño, cabeceras de seguridad en Vercel y consultas parametrizadas.
- Documentación: registro de decisiones, descartes, riesgos y validaciones para facilitar revisión antes de PR.
