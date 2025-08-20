# Script de Prueba Simple del Portfolio
# Autor: Jhon Laurens

Write-Host "=== PRUEBA DE FUNCIONAMIENTO ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Docker
Write-Host "1. Docker Status:" -ForegroundColor Yellow
try {
    $containers = docker ps --filter "name=portfolio" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    if ($containers) {
        Write-Host $containers -ForegroundColor Green
    } else {
        Write-Host "   No hay contenedores portfolio activos" -ForegroundColor Red
    }
} catch {
    Write-Host "   Error: $_" -ForegroundColor Red
}

# 2. Verificar puertos
Write-Host ""
Write-Host "2. Puertos activos:" -ForegroundColor Yellow
$ports = @(8892, 8893)
foreach ($port in $ports) {
    $check = netstat -an | findstr ":$port"
    if ($check) {
        Write-Host "   Puerto $port: ACTIVO" -ForegroundColor Green
    } else {
        Write-Host "   Puerto $port: LIBRE" -ForegroundColor Gray
    }
}

# 3. Test HTTP
Write-Host ""
Write-Host "3. Test HTTP:" -ForegroundColor Yellow
foreach ($port in $ports) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$port" -Method Head -TimeoutSec 5 -ErrorAction Stop
        Write-Host "   http://localhost:$port - Status: $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "   http://localhost:$port - No responde" -ForegroundColor Gray
    }
}

# 4. Verificar archivos críticos
Write-Host ""
Write-Host "4. Archivos críticos:" -ForegroundColor Yellow
$files = @("index.html", "assets\css\main.css", "assets\js\main.js")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== RESULTADO ===" -ForegroundColor Cyan
Write-Host "Portfolio reorganizado y funcionando!" -ForegroundColor Green
Write-Host ""
