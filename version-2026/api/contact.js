import pg from "pg";

const { Pool } = pg;

const buildDatabaseUrl = () => {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const host = process.env.HOST_NAME;
  const port = process.env.DB_PORT || process.env.POSTGRES_PORT || process.env.PORT;
  const database = process.env.DATABASE_NAME;
  const user = process.env.USUARIO_NAME;
  const password = process.env.PASS_DB;
  if (!host || !port || !database || !user || !password) return "";
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${encodeURIComponent(database)}`;
};

const pool = new Pool({
  connectionString: buildDatabaseUrl(),
  ssl: { rejectUnauthorized: false },
  max: 2
});

const clean = (value = "") => String(value).trim();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metodo no permitido." });
  }

  if (!buildDatabaseUrl()) {
    return res.status(500).json({ error: "La base de datos no está configurada." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();
  const subject = clean(body.subject || body.service || "Contacto desde Portfolio 2026");
  const message = clean(body.message);

  if (name.length < 2 || name.length > 100) return res.status(400).json({ error: "Escribe tu nombre completo." });
  if (!emailPattern.test(email)) return res.status(400).json({ error: "Escribe un correo valido." });
  if (subject.length < 3 || subject.length > 500) return res.status(400).json({ error: "Selecciona un asunto valido." });
  if (message.length < 10 || message.length > 2000) return res.status(400).json({ error: "El mensaje debe tener entre 10 y 2000 caracteres." });

  const result = await pool.query(
    `INSERT INTO public.contacts (name, email, subject, message, source, status)
     VALUES ($1, $2, $3, $4, $5, 'pending')
     RETURNING id`,
    [name, email, subject, message, "portfolio-website-v2"]
  );

  return res.status(201).json({ success: true, id: result.rows[0].id });
}
