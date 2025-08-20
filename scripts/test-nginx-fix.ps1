# 🔧 Test Docker Build con nginx.conf corregido
# ===============================================

Write-Host "🐳 PROBANDO DOCKER BUILD CON NGINX.CONF CORREGIDO..." -ForegroundColor Cyan

# Limpiar contenedores anteriores
Write-Host "`n🧹 Limpiando contenedores anteriores..." -ForegroundColor Yellow
docker stop test-portfolio-final 2>$null
docker rm test-portfolio-final 2>$null

# Build nueva imagen
Write-Host "`n🔨 Construyendo imagen con nginx.conf corregido..." -ForegroundColor Yellow
$buildResult = docker build -t portfolio-final-test -f deployment/docker/Dockerfile . 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build exitoso!" -ForegroundColor Green
} else {
    Write-Host "❌ Build falló:" -ForegroundColor Red
    Write-Host $buildResult -ForegroundColor Red
    exit 1
}

# Ejecutar contenedor
Write-Host "`n🚀 Ejecutando contenedor en puerto 8899..." -ForegroundColor Yellow
$runResult = docker run -d -p 8899:80 --name test-portfolio-final portfolio-final-test:latest
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Contenedor iniciado: $runResult" -ForegroundColor Green
    
    # Esperar a que nginx arranque
    Write-Host "`n⏱️ Esperando 5 segundos para que nginx arranque..." -ForegroundColor Yellow
    Start-Sleep 5
    
    # Verificar que nginx está corriendo
    Write-Host "`n📋 Verificando logs del contenedor..." -ForegroundColor Yellow
    docker logs test-portfolio-final
    
    # Probar acceso HTTP
    Write-Host "`n🌐 Probando acceso HTTP..." -ForegroundColor Yellow
    for ($i = 1; $i -le 3; $i++) {
        Write-Host "   Intento $i/3..." -ForegroundColor Gray
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:8899" -TimeoutSec 10 -UseBasicParsing
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ ¡SUCCESS! Portfolio accesible en http://localhost:8899" -ForegroundColor Green
                Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Green
                Write-Host "   Content Length: $($response.Content.Length) bytes" -ForegroundColor Green
                
                # Verificar contenido
                if ($response.Content -match "Data Engineer|Portfolio|Jhon") {
                    Write-Host "✅ Contenido del portfolio verificado!" -ForegroundColor Green
                } else {
                    Write-Host "⚠️ Contenido del portfolio no detectado claramente" -ForegroundColor Yellow
                }
                break
            }
        } catch {
            Write-Host "❌ Intento $i falló: $_" -ForegroundColor Red
            if ($i -lt 3) {
                Write-Host "   Esperando 3 segundos antes del siguiente intento..." -ForegroundColor Gray
                Start-Sleep 3
            }
        }
    }
    
    # Mostrar estado del contenedor
    Write-Host "`n📊 Estado del contenedor:" -ForegroundColor Yellow
    docker ps | findstr test-portfolio-final
    
    Write-Host "`n🎯 RESULTADO:" -ForegroundColor Cyan
    Write-Host "   - Portfolio accesible en: http://localhost:8899" -ForegroundColor Green
    Write-Host "   - Para parar: docker stop test-portfolio-final" -ForegroundColor Yellow
    Write-Host "   - Para limpiar: docker rm test-portfolio-final" -ForegroundColor Yellow
    
} else {
    Write-Host "❌ Error ejecutando contenedor: $runResult" -ForegroundColor Red
    exit 1
}

Write-Host "`n🚀 ¡NGINX.CONF CORREGIDO - LISTO PARA PUSH!" -ForegroundColor Green
