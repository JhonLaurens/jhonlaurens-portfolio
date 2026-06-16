const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { Client } = require("pg");

const root = path.resolve(__dirname, "..");
for (const envFile of [".env.local", ".env", ".env.example"]) {
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

  if (!host || !port || !database || !user || !password) return undefined;

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(
    password
  )}@${host}:${port}/${encodeURIComponent(database)}`;
}

async function main() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    console.error("Database connection variables are missing.");
    process.exit(1);
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  const result = await client.query(`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE source = 'backup-import')::int AS backup_import,
      COUNT(*) FILTER (WHERE source = 'portfolio-website')::int AS portfolio_website,
      COUNT(*) FILTER (WHERE status = 'pending')::int AS pending
    FROM contacts
  `);
  await client.end();

  console.log(JSON.stringify(result.rows[0]));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
