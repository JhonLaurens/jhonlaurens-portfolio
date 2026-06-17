const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const envFiles = [".env.local", ".env", ".env.example"];

for (const envFile of envFiles) {
  const envPath = path.join(root, envFile);
  if (!fs.existsSync(envPath)) continue;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match) {
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  }

  break;
}

if (
  !process.env.DATABASE_URL &&
  process.env.HOST_NAME &&
  (process.env.DB_PORT || process.env.POSTGRES_PORT || process.env.PORT) &&
  process.env.DATABASE_NAME &&
  process.env.USUARIO_NAME &&
  process.env.PASS_DB
) {
  const dbPort = process.env.DB_PORT || process.env.POSTGRES_PORT || process.env.PORT;
  process.env.DATABASE_URL = `postgresql://${encodeURIComponent(
    process.env.USUARIO_NAME
  )}:${encodeURIComponent(process.env.PASS_DB)}@${process.env.HOST_NAME}:${dbPort}/${encodeURIComponent(process.env.DATABASE_NAME)}`;
}

const app = require("../backend/api/server.js");

const server = app.listen(0, async () => {
  try {
    const port = server.address().port;
    const response = await fetch(`http://127.0.0.1:${port}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Prueba Tecnica",
        email: "test@example.com",
        subject: "Validacion formulario Supabase",
        message:
          "Mensaje de prueba tecnica para validar conexion del formulario con Supabase.",
        source: "portfolio-website",
      }),
    });

    const data = await response.json();
    console.log(
      JSON.stringify({
        status: response.status,
        success: data.success === true,
        hasId: Boolean(data.id),
      })
    );

    process.exitCode = response.ok && data.success ? 0 : 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    server.close(async () => {
      try {
        if (app.locals.redisClient?.isOpen) {
          await app.locals.redisClient.quit();
        }

        if (app.locals.pool) {
          await app.locals.pool.end();
        }
      } catch (_) {
        // Keep the contact test result as the main signal.
      }
    });
  }
});
