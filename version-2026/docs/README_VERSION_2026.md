# Version 2026

Nueva version multipagina del portfolio de Jhon Laurens, preparada para Vercel y conectada al mismo esquema `public.contacts` de Supabase/PostgreSQL.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Variables de entorno

La API serverless usa variables del servidor, nunca del navegador:

- `DATABASE_URL`, recomendado en Vercel.
- Alternativa compatible con el proyecto actual: `HOST_NAME`, `DB_PORT` o `POSTGRES_PORT`, `DATABASE_NAME`, `USUARIO_NAME`, `PASS_DB`.

No se debe commitear `.env`, `.env.local` ni credenciales.

## Rutas

- `/`: propuesta de valor y contacto temprano.
- `/servicios/`: servicios concretos.
- `/proyectos/`: casos y evidencia profesional.
- `/documentacion/`: gobierno documental, trazabilidad y calidad.
- `/sobre-mi/`: perfil ejecutivo.
- `/contacto/`: formulario principal.

## Criterios aplicados

- SEO: arquitectura con paginas HTML separadas, titulos y descripciones por ruta, URLs descriptivas y contenido escaneable.
- Accesibilidad: contraste alto, foco visible, estructura semantica, labels explicitos y reduccion de movimiento.
- Seguridad: secretos solo en API, validacion de entrada, limite de tamano, cabeceras de seguridad en Vercel y consultas parametrizadas.
- Documentacion: la pagina de documentacion toma el enfoque del prompt: trazabilidad, ADR, registro de uso de IA, decisiones tecnicas y mantenimiento vivo.
