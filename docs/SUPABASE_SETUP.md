# Configuracion de Supabase para el formulario

Esta guia reconstruye la tabla de contactos y conecta el formulario del portfolio con Supabase.

## 1. Crear o reconstruir la tabla

### Opcion A: desde Codex/terminal

1. Crea `.env.local` desde `.env.example`.
2. Agrega tu `DATABASE_URL` real de Supabase.
3. Ejecuta:

```bash
npm run db:setup
```

### Opcion B: desde Supabase SQL Editor

1. Entra al dashboard de Supabase.
2. Abre tu proyecto.
3. Ve a **SQL Editor**.
4. Copia y ejecuta el contenido de:

```text
backend/sql/supabase_contacts.sql
```

Ese script crea:

- `public.contacts`
- indices para `created_at` y `status`
- trigger de `updated_at`
- Row Level Security
- politica publica de insercion para el formulario
- politicas de lectura/actualizacion solo para usuarios autenticados
- vista `public.contact_stats`

El script es idempotente: puedes ejecutarlo varias veces sin duplicar la tabla.

## 2. Confirmar la conexion del sitio

El formulario envia los mensajes a:

```text
/api/contact
```

Ese endpoint esta en:

```text
backend/api/server.js
```

Para produccion, configura `DATABASE_URL` en Vercel. Si prefieres usar variables separadas, conserva en privado:

```text
HOST_NAME=
PORT=
DATABASE_NAME=
USUARIO_NAME=
PASS_DB=
```

No expongas `DATABASE_URL`, `PASS_DB` ni service role keys en JavaScript publico.

## 3. Probar el formulario

1. Ejecuta el sitio local:

```bash
npm run dev
```

2. Abre `http://localhost:8000`.
3. Envia un mensaje desde la seccion Contacto.
4. En Supabase, revisa **Table Editor > contacts**.

Si el mensaje no aparece, abre la consola del navegador y revisa el error de Supabase.

## 4. Variables utiles

`.env.example` incluye variables de referencia:

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
DATABASE_URL=
```

El formulario actual no necesita `SUPABASE_ANON_KEY`, porque inserta desde el backend `/api/contact`.

`DATABASE_URL` es solo para backend o scripts privados. No debe exponerse en el navegador.

## 5. Verificacion rapida

El build valida que el sitio no tenga referencias rotas conocidas:

```bash
npm run build
```
