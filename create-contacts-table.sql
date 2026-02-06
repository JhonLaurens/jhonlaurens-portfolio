-- SQL para crear la tabla contacts en Supabase
-- Ejecuta este código en el SQL Editor de tu dashboard de Supabase

-- 1. Crear la tabla contacts
CREATE TABLE IF NOT EXISTS contacts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para permitir inserciones públicas
CREATE POLICY "Allow public inserts" ON contacts
    FOR INSERT
    WITH CHECK (true);

-- 4. Crear política para permitir lecturas autenticadas (opcional)
CREATE POLICY "Allow authenticated reads" ON contacts
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- 5. Verificar que la tabla se creó correctamente
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;

-- 6. Verificar las políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'contacts';