const fs = require("fs");
const path = require("path");
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

let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  const host = process.env.HOST_NAME;
  const port = process.env.DB_PORT || process.env.POSTGRES_PORT || process.env.PORT;
  const database = process.env.DATABASE_NAME;
  const user = process.env.USUARIO_NAME;
  const password = process.env.PASS_DB;

  if (host && port && database && user && password) {
    const encodedUser = encodeURIComponent(user);
    const encodedPassword = encodeURIComponent(password);
    const encodedDatabase = encodeURIComponent(database);
    databaseUrl = `postgresql://${encodedUser}:${encodedPassword}@${host}:${port}/${encodedDatabase}`;
  }
}

if (!databaseUrl) {
  console.error(
    "DATABASE_URL is required, or provide HOST_NAME, PORT, DATABASE_NAME, USUARIO_NAME, and PASS_DB."
  );
  process.exit(1);
}

const sqlPath = path.join(root, "backend", "sql", "supabase_contacts.sql");
const sql = fs.readFileSync(sqlPath, "utf8");

const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("Supabase contact schema created or updated successfully.");
}

main().catch(async (error) => {
  try {
    await client.end();
  } catch (_) {
    // Ignore shutdown errors so the real database error stays visible.
  }

  console.error("Could not set up Supabase schema:");
  console.error(error.message);
  process.exit(1);
});
