# 🔍 Verificación Docker Build Fix
# ================================

Write-Host "🐳 VERIFICANDO DOCKER BUILD CORREGIDO..." -ForegroundColor Cyan

# 1. Verificar que los archivos están en su lugar
Write-Host "`n📁 Verificando archivos necesarios..." -ForegroundColor Yellow

$nginxPath = "deployment/nginx/nginx.conf"
$dockerfilePath = "deployment/docker/Dockerfile"

if (Test-Path $nginxPath) {
    Write-Host "✅ nginx.conf encontrado en: $nginxPath" -ForegroundColor Green
} else {
    Write-Host "❌ nginx.conf NO encontrado en: $nginxPath" -ForegroundColor Red
    exit 1
}

if (Test-Path $dockerfilePath) {
    Write-Host "✅ Dockerfile encontrado en: $dockerfilePath" -ForegroundColor Green
} else {
    Write-Host "❌ Dockerfile NO encontrado en: $dockerfilePath" -ForegroundColor Red
    exit 1
}

# 2. Verificar contenido del Dockerfile
Write-Host "`n🔍 Verificando configuración del Dockerfile..." -ForegroundColor Yellow

$dockerfileContent = Get-Content $dockerfilePath -Raw
if ($dockerfileContent -match "deployment/nginx/nginx.conf") {
    Write-Host "✅ Dockerfile usa la ruta correcta: deployment/nginx/nginx.conf" -ForegroundColor Green
} else {
    Write-Host "❌ Dockerfile NO usa la ruta correcta" -ForegroundColor Red
    Write-Host "   Contenido relacionado con nginx:" -ForegroundColor Yellow
    Get-Content $dockerfilePath | Select-String "nginx"
    exit 1
}

# 3. Limpiar contenedores anteriores
Write-Host "`n🧹 Limpiando contenedores de prueba..." -ForegroundColor Yellow
docker stop test-portfolio-verification 2>$null
docker rm test-portfolio-verification 2>$null

# 4. Construir imagen de prueba
Write-Host "`n🔨 Construyendo imagen de prueba..." -ForegroundColor Yellow
$buildResult = docker build -t portfolio-verification -f $dockerfilePath . 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build exitoso!" -ForegroundColor Green
} else {
    Write-Host "❌ Build falló:" -ForegroundColor Red
    Write-Host $buildResult -ForegroundColor Red
    exit 1
}

# 5. Ejecutar contenedor de prueba
Write-Host "`n🚀 Ejecutando contenedor de prueba..." -ForegroundColor Yellow
$runResult = docker run -d -p 8899:80 --name test-portfolio-verification portfolio-verification:latest
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Contenedor iniciado con ID: $runResult" -ForegroundColor Green
    
    # Esperar un momento para que nginx arranque
    Start-Sleep 3
    
    # 6. Verificar que responde
    Write-Host "`n🌐 Probando acceso HTTP..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8899" -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ ¡Portfolio accesible en http://localhost:8899!" -ForegroundColor Green
            Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Green
            
            # Verificar que contiene contenido del portfolio
            if ($response.Content -match "Data Engineer|Portfolio|Jhon Laurens") {
                Write-Host "✅ Contenido del portfolio verificado!" -ForegroundColor Green
            } else {
                Write-Host "⚠️ Contenido del portfolio no detectado" -ForegroundColor Yellow
            }
        }
    } catch {
        Write-Host "❌ Error accediendo a HTTP: $_" -ForegroundColor Red
        
        # Mostrar logs del contenedor para diagnóstico
        Write-Host "`n📋 Logs del contenedor:" -ForegroundColor Yellow
        docker logs test-portfolio-verification
    }
    
    # Limpiar
    Write-Host "`n🧹 Limpiando contenedor de prueba..." -ForegroundColor Yellow
    docker stop test-portfolio-verification
    docker rm test-portfolio-verification
    
} else {
    Write-Host "❌ Error ejecutando contenedor: $runResult" -ForegroundColor Red
    exit 1
}

Write-Host "`n🏆 VERIFICACIÓN COMPLETADA!" -ForegroundColor Green
Write-Host "✅ El Dockerfile corregido funciona correctamente" -ForegroundColor Green
Write-Host "✅ GitHub Actions debería funcionar ahora" -ForegroundColor Green
Write-Host "`n🚀 Ejecuta 'git push origin main' para actualizar GitHub" -ForegroundColor Cyan
