export default function handler(req, res) {
  const timestamp = new Date().toISOString();
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  const healthStatus = {
    status: 'healthy',
    timestamp,
    uptime: `${Math.floor(uptime / 60)} minutes`,
    memory: {
      used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
    },
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      vercelRegion: process.env.VERCEL_REGION || 'unknown',
      vercelEnv: process.env.VERCEL_ENV || 'unknown'
    },
    checks: {
      api: 'operational',
      database: 'not_configured',
      external_services: 'operational'
    }
  };

  // Set appropriate headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Return health status
  res.status(200).json(healthStatus);
}