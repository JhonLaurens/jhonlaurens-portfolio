# Script de Verificacion Completa - Portfolio Docker
# Autor: Jhon Laurens

Write-Host "=== VERIFICACION COMPLETA DEL PORTFOLIO DOCKER ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Docker
Write-Host "1. Verificando Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker version --format "{{.Server.Version}}" 2>$null
    if ($dockerVersion) {
        Write-Host "   Docker funcionando: v$dockerVersion" -ForegroundColor Green
    } else {
        Write-Host "   Docker NO esta funcionando" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   Error verificando Docker" -ForegroundColor Red
    exit 1
}

# 2. Verificar imagenes
Write-Host "2. Verificando imagenes..." -ForegroundColor Yellow
$images = docker images --format "{{.Repository}}:{{.Tag}}" | findstr "jhon-portfolio"
if ($images) {
    Write-Host "   Imagen encontrada: $images" -ForegroundColor Green
} else {
    Write-Host "   Imagen NO encontrada - construyendo..." -ForegroundColor Yellow
    docker build -t jhon-portfolio:latest .
}

# 3. Verificar contenedores
Write-Host "3. Verificando contenedores..." -ForegroundColor Yellow
$containers = docker ps --format "{{.Names}}" 2>$null
if ($containers) {
    Write-Host "   Contenedores ejecutandose:" -ForegroundColor Green
    $containers | ForEach-Object { Write-Host "   - $_" -ForegroundColor White }
} else {
    Write-Host "   No hay contenedores ejecutandose - iniciando..." -ForegroundColor Yellow
    docker-compose -f docker-compose-simple.yml up -d
    Start-Sleep -Seconds 10
}

# 4. Verificar puertos
Write-Host "4. Verificando puertos..." -ForegroundColor Yellow
$ports = @("8892", "8080", "5432")
foreach ($port in $ports) {
    $connection = netstat -an | findstr ":$port "
    if ($connection) {
        Write-Host "   Puerto $port: ACTIVO" -ForegroundColor Green
    } else {
        Write-Host "   Puerto $port: NO ACTIVO" -ForegroundColor Red
    }
}

# 5. Probar conectividad
Write-Host "5. Probando conectividad..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8892" -TimeoutSec 5 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   Portfolio: FUNCIONANDO" -ForegroundColor Green
    }
} catch {
    Write-Host "   Portfolio: NO RESPONDE" -ForegroundColor Red
}

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -TimeoutSec 5 -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   Adminer: FUNCIONANDO" -ForegroundColor Green
    }
} catch {
    Write-Host "   Adminer: NO RESPONDE" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== RESUMEN ===" -ForegroundColor Cyan
Write-Host "Portfolio: http://localhost:8892" -ForegroundColor White
Write-Host "Adminer:   http://localhost:8080" -ForegroundColor White
Write-Host ""
Write-Host "Para ver logs: docker-compose -f docker-compose-simple.yml logs" -ForegroundColor Yellow
Write-Host "Para reiniciar: docker-compose -f docker-compose-simple.yml restart" -ForegroundColor Yellow
