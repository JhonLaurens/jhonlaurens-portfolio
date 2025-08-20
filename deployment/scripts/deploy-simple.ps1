# Script de Deployment Simplificado para Portfolio
# Autor: Jhon Laurens

Write-Host "Iniciando deployment simplificado del Portfolio..." -ForegroundColor Cyan

# Verificar Docker
try {
    docker version | Out-Null
    Write-Host "Docker está funcionando!" -ForegroundColor Green
} catch {
    Write-Host "Error: Docker no está funcionando. Ejecuta primero: .\fix-docker-simple.ps1" -ForegroundColor Red
    exit 1
}

# Construir imagen del portfolio
Write-Host "Construyendo imagen del portfolio..." -ForegroundColor Yellow
docker build -t jhon-portfolio:latest .

# Iniciar servicios
Write-Host "Iniciando servicios..." -ForegroundColor Yellow
docker-compose -f docker-compose-simple.yml up -d

Write-Host ""
Write-Host "DEPLOYMENT COMPLETADO!" -ForegroundColor Green
Write-Host ""
Write-Host "Servicios disponibles:" -ForegroundColor Cyan
Write-Host "Portfolio:    http://localhost:8892" -ForegroundColor White
Write-Host "Adminer:      http://localhost:8080" -ForegroundColor White
Write-Host ""
Write-Host "Credenciales de BD:" -ForegroundColor Cyan
Write-Host "Usuario: admin" -ForegroundColor White
Write-Host "Password: admin123" -ForegroundColor White
Write-Host "Base de datos: portfolio" -ForegroundColor White
Write-Host ""
Write-Host "Para detener: docker-compose -f docker-compose-simple.yml down" -ForegroundColor Yellow
