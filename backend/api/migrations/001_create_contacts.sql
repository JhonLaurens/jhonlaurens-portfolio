-- Tabla principal de contactos recibidos desde el formulario
CREATE TABLE IF NOT EXISTS contacts (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(255)  NOT NULL,
  subject    VARCHAR(255)  NOT NULL DEFAULT 'Contacto desde Portfolio',
  message    TEXT          NOT NULL,
  source     VARCHAR(100)  NOT NULL DEFAULT 'portfolio-website',
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Índice para búsqueda por email y fecha
CREATE INDEX IF NOT EXISTS idx_contacts_email      ON contacts (email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);
