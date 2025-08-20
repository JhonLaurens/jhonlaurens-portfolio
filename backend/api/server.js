const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg");
const redis = require("redis");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Base de Datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Configuración de Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect();

// Middleware de seguridad
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:8892", "https://tu-dominio.com"],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
});
app.use(limiter);

app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));

// Rutas de Analytics

// 📊 Endpoint para registrar visitas
app.post("/api/analytics/visit", async (req, res) => {
  try {
    const { page, userAgent, referrer, timestamp } = req.body;
    const ip = req.ip;

    await pool.query(
      "INSERT INTO page_visits (page, ip_address, user_agent, referrer, visited_at) VALUES ($1, $2, $3, $4, $5)",
      [page, ip, userAgent, referrer, new Date(timestamp)]
    );

    // Incrementar contador en Redis
    await redisClient.incr(`visits:${page}`);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error registrando visita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 📈 Endpoint para obtener estadísticas
app.get("/api/analytics/stats", async (req, res) => {
  try {
    // Estadísticas desde PostgreSQL
    const totalVisits = await pool.query(
      "SELECT COUNT(*) as total FROM page_visits"
    );
    const uniqueVisitors = await pool.query(
      "SELECT COUNT(DISTINCT ip_address) as unique FROM page_visits"
    );
    const topPages = await pool.query(`
      SELECT page, COUNT(*) as visits 
      FROM page_visits 
      GROUP BY page 
      ORDER BY visits DESC 
      LIMIT 10
    `);
    const visitsByDate = await pool.query(`
      SELECT DATE(visited_at) as date, COUNT(*) as visits 
      FROM page_visits 
      WHERE visited_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(visited_at) 
      ORDER BY date DESC
    `);

    res.json({
      totalVisits: parseInt(totalVisits.rows[0].total),
      uniqueVisitors: parseInt(uniqueVisitors.rows[0].unique),
      topPages: topPages.rows,
      visitsByDate: visitsByDate.rows,
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 🏦 Endpoint para métricas de Core Banking (simulado)
app.get("/api/banking/metrics", async (req, res) => {
  try {
    // Métricas simuladas de Core Banking
    const metrics = {
      transactionsMigrated: "1,247,832",
      dataIntegrity: "99.97%",
      systemUptime: "99.95%",
      processingTime: "1.2s",
      dailyTransactions: "45,678",
      lastUpdate: new Date().toISOString(),
    };

    // Cache en Redis por 5 minutos
    await redisClient.setEx("banking:metrics", 300, JSON.stringify(metrics));

    res.json(metrics);
  } catch (error) {
    console.error("Error obteniendo métricas bancarias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 🤖 Endpoint para proyectos de IA
app.get("/api/ai/projects", async (req, res) => {
  try {
    const projects = [
      {
        id: 1,
        name: "Sistema de Detección de Fraudes",
        status: "En Producción",
        accuracy: "96.8%",
        transactions_analyzed: "250,000+",
        technology: ["Python", "TensorFlow", "PostgreSQL"],
      },
      {
        id: 2,
        name: "Análisis Predictivo de Riesgo",
        status: "En Desarrollo",
        accuracy: "92.1%",
        predictions_made: "15,000+",
        technology: ["Python", "Scikit-learn", "Apache Airflow"],
      },
      {
        id: 3,
        name: "Chatbot Financiero Inteligente",
        status: "Piloto",
        accuracy: "89.3%",
        queries_resolved: "5,000+",
        technology: ["Python", "NLTK", "FastAPI"],
      },
    ];

    res.json(projects);
  } catch (error) {
    console.error("Error obteniendo proyectos IA:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 📋 Health Check
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    await redisClient.ping();
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        redis: "connected",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});

// Tarea programada para limpiar datos antiguos (cada día a las 2 AM)
cron.schedule("0 2 * * *", async () => {
  try {
    await pool.query(
      "DELETE FROM page_visits WHERE visited_at < NOW() - INTERVAL '90 days'"
    );
    console.log("Limpieza de datos antiguos completada");
  } catch (error) {
    console.error("Error en limpieza de datos:", error);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Analytics ejecutándose en puerto ${PORT}`);
  console.log(`🏦 Portfolio Data Engineer - Core Banking Analytics`);
});
