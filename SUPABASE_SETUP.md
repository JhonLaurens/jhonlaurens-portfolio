# Configuración de Supabase para SnapFolio

Este documento te guiará para configurar Supabase y conectar la base de datos con tu portafolio.

## 1. Configurar tu proyecto Supabase

### Paso 1: Obtener la URL del proyecto
1. Ve a tu [dashboard de Supabase](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** > **API**
4. Copia la **Project URL** (algo como: `https://abcdefghijklmnop.supabase.co`)

### Paso 2: Actualizar la configuración
1. Abre el archivo `assets/js/supabase.js`
2. Reemplaza `your-project-ref` en la línea 3 con tu referencia de proyecto:
   ```javascript
   const SUPABASE_URL = 'https://tu-referencia-proyecto.supabase.co';
   ```

## 2. Crear la tabla de contactos

Ejecuta este SQL en el **SQL Editor** de Supabase:

```sql
-- Crear tabla de contactos
CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserciones públicas
CREATE POLICY "Allow public inserts" ON contacts
    FOR INSERT
    WITH CHECK (true);

-- Crear política para permitir lecturas autenticadas (opcional)
CREATE POLICY "Allow authenticated reads" ON contacts
    FOR SELECT
    USING (auth.role() = 'authenticated');
```

## 3. Configurar políticas de seguridad (opcional)

Si quieres ver los contactos desde el dashboard:

```sql
-- Permitir que solo usuarios autenticados vean los contactos
CREATE POLICY "Allow authenticated users to view contacts" ON contacts
    FOR SELECT
    USING (auth.role() = 'authenticated');
```

## 4. Verificar la configuración

1. Abre tu portafolio en el navegador
2. Ve a la sección de contacto
3. Llena el formulario y envíalo
4. Verifica en tu dashboard de Supabase que el contacto se guardó en la tabla `contacts`

## 5. Variables de entorno (para desarrollo local)

El archivo `.env` contiene:
```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=sbp_1641563c55288a1dad3b1687f17d279c0379554e
```

**Nota:** Para aplicaciones web estáticas como esta, las variables de entorno no se cargan automáticamente. Las credenciales están directamente en `supabase.js` para simplicidad.

## 6. Funcionalidades adicionales

Puedes extender la funcionalidad agregando:

- **Tabla de proyectos:** Para gestionar tu portafolio dinámicamente
- **Tabla de visitantes:** Para analytics básicos
- **Autenticación:** Para un panel de administración

### Ejemplo de tabla de proyectos:
```sql
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    project_url TEXT,
    github_url TEXT,
    technologies TEXT[],
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Solución de problemas

### Error de CORS
Si recibes errores de CORS, verifica que:
1. La URL de Supabase sea correcta
2. La clave anónima sea válida
3. Las políticas RLS estén configuradas correctamente

### Formulario no envía
1. Abre las herramientas de desarrollador (F12)
2. Ve a la consola para ver errores
3. Verifica que `supabase.js` se cargue antes que `main.js`

### Datos no aparecen en Supabase
1. Verifica que la tabla `contacts` exista
2. Confirma que las políticas RLS permitan inserciones
3. Revisa los logs en el dashboard de Supabase