const fs = require("fs");
const path = require("path");
const readline = require("readline");
const zlib = require("zlib");
const dotenv = require("dotenv");
const { Client } = require("pg");

const root = path.resolve(__dirname, "..");
const envFiles = [".env.local", ".env", ".env.example"];

for (const envFile of envFiles) {
  const envPath = path.join(root, envFile);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

function getDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const host = process.env.HOST_NAME;
  const port = process.env.DB_PORT || process.env.POSTGRES_PORT || process.env.PORT;
  const database = process.env.DATABASE_NAME;
  const user = process.env.USUARIO_NAME;
  const password = process.env.PASS_DB;

  if (host && port && database && user && password) {
    return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(
      password
    )}@${host}:${port}/${encodeURIComponent(database)}`;
  }

  return undefined;
}

function decodeCopyValue(value) {
  if (value === "\\N") return null;

  return value
    .replace(/\\\\/g, "\u0000")
    .replace(/\\t/g, "\t")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\u0000/g, "\\");
}

async function readContactsFromBackup(backupPath) {
  const contacts = [];
  const stream = fs.createReadStream(backupPath).pipe(zlib.createGunzip());
  const reader = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let inContactsCopy = false;

  for await (const line of reader) {
    if (
      line ===
      "COPY public.contacts (id, name, email, subject, message, created_at) FROM stdin;"
    ) {
      inContactsCopy = true;
      continue;
    }

    if (!inContactsCopy) continue;
    if (line === "\\.") break;

    const [legacyId, name, email, subject, message, createdAt] = line
      .split("\t")
      .map(decodeCopyValue);

    contacts.push({
      legacyId,
      name,
      email,
      subject: subject || "Contacto desde backup",
      message,
      createdAt,
    });
  }

  return contacts;
}

async function main() {
  const backupPath =
    process.argv[2] ||
    "C:\\Users\\jhonjara\\Downloads\\db_cluster-19-08-2025@06-13-40.backup.gz";

  if (!fs.existsSync(backupPath)) {
    console.error(`Backup file not found: ${backupPath}`);
    process.exit(1);
  }

  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    console.error(
      "DATABASE_URL is required, or provide HOST_NAME, PORT, DATABASE_NAME, USUARIO_NAME, and PASS_DB."
    );
    process.exit(1);
  }

  const contacts = await readContactsFromBackup(backupPath);
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  let inserted = 0;
  let skipped = 0;
  let adjusted = 0;

  try {
    await client.query("BEGIN");

    for (const contact of contacts) {
      const normalizedName =
        contact.name && contact.name.trim().length >= 2
          ? contact.name.trim()
          : "Contacto backup";
      const normalizedMessage =
        contact.message && contact.message.trim().length >= 10
          ? contact.message.trim()
          : "Mensaje no disponible en el backup anterior.";
      const normalizedSubject =
        contact.subject && contact.subject.trim()
          ? contact.subject.trim()
          : "Contacto desde backup";

      if (
        normalizedName !== contact.name ||
        normalizedMessage !== contact.message ||
        normalizedSubject !== contact.subject
      ) {
        adjusted += 1;
      }

      const result = await client.query(
        `INSERT INTO contacts (name, email, subject, message, source, created_at)
         SELECT $1, $2, $3, $4, 'backup-import', $5::timestamptz
         WHERE NOT EXISTS (
           SELECT 1
           FROM contacts
           WHERE email = $2
             AND message = $4
             AND created_at = $5::timestamptz
         )`,
        [
          normalizedName,
          contact.email,
          normalizedSubject,
          normalizedMessage,
          contact.createdAt,
        ]
      );

      if (result.rowCount === 1) inserted += 1;
      else skipped += 1;
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }

  console.log(
    JSON.stringify({
      read: contacts.length,
      inserted,
      skipped,
      adjusted,
    })
  );
}

main().catch((error) => {
  console.error("Could not import contacts backup:");
  console.error(error.message);
  process.exit(1);
});
