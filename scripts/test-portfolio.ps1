# Script de Prueba Completa del Portfolio
# Autor: Jhon Laurens - Data Engineer

Write-Host "=== PRUEBA COMPLETA DEL PORTFOLIO ===" -ForegroundColor Cyan
Write-Host ""

# 1. VERIFICAR CONTENEDORES
Write-Host "1. VERIFICANDO CONTENEDORES DOCKER..." -ForegroundColor Yellow
$containers = docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
Write-Host $containers
Write-Host ""

# 2. PROBAR PORTFOLIO PRINCIPAL (8892)
Write-Host "2. PROBANDO PORTFOLIO PRINCIPAL (Puerto 8892)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8892" -TimeoutSec 10 -UseBasicParsing
    Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   📦 Size: $($response.Content.Length) bytes" -ForegroundColor Gray
    
    # Verificar contenido HTML
    if ($response.Content -match "<title>.*Jhon.*Laurens.*</title>") {
        Write-Host "   ✅ Titulo correcto detectado" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Titulo no detectado correctamente" -ForegroundColor Yellow
    }
    
    # Verificar assets
    if ($response.Content -match "assets/") {
        Write-Host "   ✅ Assets referenciados correctamente" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Problemas con assets" -ForegroundColor Red
    }
    
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. PROBAR SEGUNDO CONTENEDOR (8893)
Write-Host ""
Write-Host "3. PROBANDO SEGUNDO CONTENEDOR (Puerto 8893)..." -ForegroundColor Yellow
try {
    $response2 = Invoke-WebRequest -Uri "http://localhost:8893" -TimeoutSec 10 -UseBasicParsing
    Write-Host "   ✅ Status: $($response2.StatusCode)" -ForegroundColor Green
    Write-Host "   📦 Size: $($response2.Content.Length) bytes" -ForegroundColor Gray
} catch {
    Write-Host "   ⚠️  Puerto 8893 no disponible" -ForegroundColor Yellow
}

# 4. VERIFICAR ARCHIVOS EN CONTENEDOR
Write-Host ""
Write-Host "4. VERIFICANDO ARCHIVOS EN CONTENEDOR..." -ForegroundColor Yellow
try {
    $files = docker exec portfolio-working find /usr/share/nginx/html -name "*.html" -o -name "*.css" -o -name "*.js" | Sort-Object
    if ($files) {
        Write-Host "   ✅ Archivos encontrados:" -ForegroundColor Green
        $files | Select-Object -First 10 | ForEach-Object { 
            Write-Host "     $_" -ForegroundColor Gray 
        }
        if ($files.Count -gt 10) {
            Write-Host "     ... y $($files.Count - 10) más" -ForegroundColor Gray
        }
    }
} catch {
    Write-Host "   ❌ Error accediendo al contenedor" -ForegroundColor Red
}

# 5. VERIFICAR LOGS DEL CONTENEDOR
Write-Host ""
Write-Host "5. LOGS RECIENTES DEL CONTENEDOR..." -ForegroundColor Yellow
try {
    $logs = docker logs --tail 5 portfolio-working 2>&1
    if ($logs) {
        Write-Host "   📋 Últimas 5 líneas:" -ForegroundColor Gray
        $logs | ForEach-Object { Write-Host "     $_" -ForegroundColor White }
    }
} catch {
    Write-Host "   ❌ Error leyendo logs" -ForegroundColor Red
}

# 6. PROBAR RECURSOS ESPECÍFICOS
Write-Host ""
Write-Host "6. PROBANDO RECURSOS ESPECÍFICOS..." -ForegroundColor Yellow

$testUrls = @(
    "http://localhost:8892/assets/css/main.css",
    "http://localhost:8892/assets/js/main.js",
    "http://localhost:8892/assets/img/favicon.png"
)

foreach ($url in $testUrls) {
    try {
        $resource = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 5 -UseBasicParsing
        Write-Host "   ✅ $($url.Split('/')[-1]): $($resource.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "   ❌ $($url.Split('/')[-1]): Error" -ForegroundColor Red
    }
}

# 7. RESULTADO FINAL
Write-Host ""
Write-Host "=== RESULTADO FINAL ===" -ForegroundColor Cyan

# Abrir en navegador
Write-Host "🌐 Abriendo portfolio en navegador..." -ForegroundColor Yellow
try {
    Start-Process "http://localhost:8892"
    Write-Host "   ✅ Navegador abierto" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  No se pudo abrir navegador automáticamente" -ForegroundColor Yellow
    Write-Host "   💡 Abre manualmente: http://localhost:8892" -ForegroundColor White
}

Write-Host ""
Write-Host "📍 URLs DISPONIBLES:" -ForegroundColor Yellow
Write-Host "   🎯 Portfolio Principal: http://localhost:8892" -ForegroundColor White
Write-Host "   🔧 Adminer (DB): http://localhost:8080" -ForegroundColor White
Write-Host "   📧 MailHog: http://localhost:8025" -ForegroundColor White
Write-Host ""
Write-Host "✅ PRUEBA COMPLETADA!" -ForegroundColor Green
Write-Host ""
