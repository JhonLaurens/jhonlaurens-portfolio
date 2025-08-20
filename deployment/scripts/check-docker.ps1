# 🐳 Script para verificar y iniciar Docker
# Una vez que Docker Desktop esté ejecutándose, usa este script

Write-Host "🔍 Verificando Docker..." -ForegroundColor Cyan

# Verificar que Docker esté corriendo
try {
    $dockerInfo = docker info 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Docker está corriendo correctamente" -ForegroundColor Green
        
        # Continuar con el deployment
        Write-Host "🚀 Iniciando deployment completo..." -ForegroundColor Yellow
        docker-compose up -d
        
        Write-Host "🌐 Servicios disponibles:" -ForegroundColor Cyan
        Write-Host "   Portfolio:     http://localhost:8892" -ForegroundColor White
        Write-Host "   API Analytics: http://localhost:3001" -ForegroundColor White
        Write-Host "   Adminer:       http://localhost:8080" -ForegroundColor White
        Write-Host "   Grafana:       http://localhost:3000" -ForegroundColor White
        
    } else {
        Write-Host "❌ Docker no está corriendo. Por favor:" -ForegroundColor Red
        Write-Host "1. Inicia Docker Desktop desde el menú de inicio" -ForegroundColor Yellow
        Write-Host "2. Espera a ver el ícono de la ballena en la bandeja" -ForegroundColor Yellow
        Write-Host "3. Ejecuta este script nuevamente" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error conectando con Docker: $($_.Exception.Message)" -ForegroundColor Red
}
