# Script de deployment para Windows PowerShell
# Autor: Jhon Laurens - Data Engineer

Write-Host "🚀 Iniciando deployment del Portfolio Data Engineer..." -ForegroundColor Cyan

# Verificar que Docker esté corriendo
try {
    docker info | Out-Null
    Write-Host "✅ Docker está corriendo" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Docker no está corriendo" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Construyendo imágenes Docker..." -ForegroundColor Yellow

# Construir imagen del portfolio
Write-Host "Construyendo imagen del portfolio..." -ForegroundColor Gray
docker build -t jhon-portfolio:latest .

# Construir imagen de la API
Write-Host "Construyendo imagen de la API..." -ForegroundColor Gray
docker build -f api/Dockerfile.api -t portfolio-analytics-api:latest ./api

Write-Host "🗄️ Iniciando servicios..." -ForegroundColor Yellow

# Iniciar todos los servicios
docker-compose up -d

Write-Host "⏳ Esperando que los servicios estén listos..." -ForegroundColor Yellow

# Esperar a que PostgreSQL esté listo
Write-Host "Esperando PostgreSQL..." -ForegroundColor Gray
do {
    Start-Sleep -Seconds 2
    $pgReady = docker exec portfolio-analytics-db pg_isready -U analyst 2>$null
} while ($LASTEXITCODE -ne 0)

# Esperar a que la API esté lista
Write-Host "Esperando API..." -ForegroundColor Gray
do {
    Start-Sleep -Seconds 2
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -TimeoutSec 5 -UseBasicParsing
        $apiReady = $response.StatusCode -eq 200
    } catch {
        $apiReady = $false
    }
} while (-not $apiReady)

Write-Host ""
Write-Host "✅ Deployment completado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Servicios disponibles:" -ForegroundColor Cyan
Write-Host "   Portfolio:     http://localhost:8892" -ForegroundColor White
Write-Host "   API Analytics: http://localhost:3001" -ForegroundColor White
Write-Host "   Adminer:       http://localhost:8080" -ForegroundColor White
Write-Host "   Grafana:       http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Credenciales:" -ForegroundColor Cyan
Write-Host "   Grafana: admin / admin2024" -ForegroundColor White
Write-Host "   PostgreSQL: analyst / secure_password_2024" -ForegroundColor White
Write-Host ""
Write-Host "📊 Para ver logs: docker-compose logs -f" -ForegroundColor Yellow
Write-Host "🛑 Para detener: docker-compose down" -ForegroundColor Yellow

# Abrir el portfolio en el navegador
Write-Host ""
Write-Host "🌐 Abriendo portfolio en el navegador..." -ForegroundColor Cyan
Start-Process "http://localhost:8892"
