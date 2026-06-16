-- Supabase contact form schema for jhonlaurens-portfolio
-- Run this file in Supabase SQL Editor to rebuild the contact database objects.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 100),
    email TEXT NOT NULL CHECK (
        email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    ),
    subject TEXT NOT NULL DEFAULT 'Contacto desde Portfolio',
    message TEXT NOT NULL CHECK (char_length(trim(message)) BETWEEN 10 AND 2000),
    source TEXT NOT NULL DEFAULT 'portfolio-website',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'read', 'replied', 'archived')
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    responded_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at
    ON public.contacts (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contacts_status
    ON public.contacts (status);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_contacts_updated_at ON public.contacts;
CREATE TRIGGER trg_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contacts_public_insert" ON public.contacts;
CREATE POLICY "contacts_public_insert"
ON public.contacts
FOR INSERT
TO anon
WITH CHECK (
    status = 'pending'
    AND source IN ('portfolio-website', 'portfolio-website-v2')
);

DROP POLICY IF EXISTS "contacts_authenticated_select" ON public.contacts;
CREATE POLICY "contacts_authenticated_select"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "contacts_authenticated_update" ON public.contacts;
CREATE POLICY "contacts_authenticated_update"
ON public.contacts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE OR REPLACE VIEW public.contact_stats AS
SELECT
    COUNT(*) AS total_contacts,
    COUNT(*) FILTER (WHERE status = 'pending') AS pending_contacts,
    COUNT(*) FILTER (WHERE status = 'replied') AS replied_contacts,
    MAX(created_at) AS latest_contact_at
FROM public.contacts;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.contacts TO anon;
GRANT SELECT, UPDATE ON public.contacts TO authenticated;
GRANT SELECT ON public.contact_stats TO authenticated;
