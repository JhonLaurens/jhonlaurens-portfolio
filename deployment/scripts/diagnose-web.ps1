# Script de Diagnostico Web para Portfolio
# Autor: Jhon Laurens

Write-Host "=== DIAGNOSTICO WEB DEL PORTFOLIO ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar contenedor
Write-Host "1. Verificando contenedor..." -ForegroundColor Yellow
$container = docker ps --filter "name=portfolio-working" --format "{{.Names}}"
if ($container) {
    Write-Host "   Contenedor activo: $container" -ForegroundColor Green
    
    # Ver logs recientes
    Write-Host "   Logs recientes:" -ForegroundColor Gray
    docker logs --tail 10 portfolio-working
} else {
    Write-Host "   No hay contenedor activo" -ForegroundColor Red
    exit 1
}

# 2. Verificar puerto
Write-Host "2. Verificando puerto 8892..." -ForegroundColor Yellow
$portCheck = netstat -an | findstr "8892"
if ($portCheck) {
    Write-Host "   Puerto 8892: ACTIVO" -ForegroundColor Green
    Write-Host "   $portCheck" -ForegroundColor Gray
} else {
    Write-Host "   Puerto 8892: NO ACTIVO" -ForegroundColor Red
}

# 3. Probar conectividad web
Write-Host "3. Probando conectividad web..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8892" -TimeoutSec 10 -UseBasicParsing
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Content-Length: $($response.Content.Length)" -ForegroundColor Gray
    
    # Verificar contenido HTML
    if ($response.Content -match "<title>") {
        Write-Host "   HTML: VALIDO (contiene <title>)" -ForegroundColor Green
    } else {
        Write-Host "   HTML: PROBLEMATICO (sin <title>)" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Verificar archivos en el contenedor
Write-Host "4. Verificando archivos en contenedor..." -ForegroundColor Yellow
$files = docker exec portfolio-working ls -la /usr/share/nginx/html/ 2>$null
if ($files) {
    Write-Host "   Archivos encontrados:" -ForegroundColor Green
    $files | Select-Object -First 5 | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
} else {
    Write-Host "   No se pueden listar archivos" -ForegroundColor Red
}

# 5. Verificar index.html específicamente
Write-Host "5. Verificando index.html..." -ForegroundColor Yellow
try {
    $indexExists = docker exec portfolio-working test -f /usr/share/nginx/html/index.html 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   index.html: EXISTE" -ForegroundColor Green
    } else {
        Write-Host "   index.html: NO EXISTE" -ForegroundColor Red
    }
} catch {
    Write-Host "   Error verificando index.html" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== ACCIONES RECOMENDADAS ===" -ForegroundColor Cyan
Write-Host "1. Abrir: http://localhost:8892 en tu navegador" -ForegroundColor White
Write-Host "2. Si no funciona, ejecutar: docker restart portfolio-working" -ForegroundColor White
Write-Host "3. Ver logs en tiempo real: docker logs -f portfolio-working" -ForegroundColor White
Write-Host ""
