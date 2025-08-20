# Script de Diagnóstico del Formulario de Contacto
# Autor: Jhon Laurens - Data Engineer

Write-Host "=== DIAGNÓSTICO FORMULARIO DE CONTACTO ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar archivos JavaScript
Write-Host "1. VERIFICANDO ARCHIVOS JAVASCRIPT..." -ForegroundColor Yellow

$jsFiles = @(
    "assets\js\main.js",
    "assets\js\supabase.js", 
    "assets\js\contact-fallback.js"
)

foreach ($file in $jsFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "   ✅ $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file (no encontrado)" -ForegroundColor Red
    }
}

# 2. Verificar contenido del formulario HTML
Write-Host ""
Write-Host "2. VERIFICANDO FORMULARIO EN HTML..." -ForegroundColor Yellow

try {
    $indexContent = Get-Content "index.html" -Raw
    
    if ($indexContent -match 'id="contactForm"') {
        Write-Host "   ✅ Formulario de contacto encontrado" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Formulario de contacto no encontrado" -ForegroundColor Red
    }
    
    if ($indexContent -match 'class="error-message"') {
        Write-Host "   ✅ Elemento de error configurado" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Elemento de error no encontrado" -ForegroundColor Red
    }
    
    if ($indexContent -match 'class="sent-message"') {
        Write-Host "   ✅ Elemento de éxito configurado" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Elemento de éxito no encontrado" -ForegroundColor Red
    }
    
} catch {
    Write-Host "   ❌ Error leyendo index.html" -ForegroundColor Red
}

# 3. Verificar inclusión de scripts
Write-Host ""
Write-Host "3. VERIFICANDO INCLUSIÓN DE SCRIPTS..." -ForegroundColor Yellow

if ($indexContent -match 'assets/js/main.js') {
    Write-Host "   ✅ main.js incluido" -ForegroundColor Green
} else {
    Write-Host "   ❌ main.js no incluido" -ForegroundColor Red
}

if ($indexContent -match 'assets/js/supabase.js') {
    Write-Host "   ✅ supabase.js incluido" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  supabase.js no incluido en HTML" -ForegroundColor Yellow
}

# 4. Probar conectividad al formulario
Write-Host ""
Write-Host "4. PROBANDO ACCESO AL FORMULARIO..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8892/#contact" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Página de contacto accesible" -ForegroundColor Green
        
        if ($response.Content -match 'contactForm') {
            Write-Host "   ✅ Formulario presente en la página" -ForegroundColor Green
        } else {
            Write-Host "   ❌ Formulario no detectado en la respuesta" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "   ❌ Error accediendo a la página: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Verificar logs del contenedor
Write-Host ""
Write-Host "5. LOGS RECIENTES DEL CONTENEDOR..." -ForegroundColor Yellow

try {
    $logs = docker logs portfolio-fixed --tail 5 2>&1
    if ($logs) {
        Write-Host "   📋 Últimas líneas:" -ForegroundColor Gray
        $logs | ForEach-Object { Write-Host "     $_" -ForegroundColor White }
    }
} catch {
    Write-Host "   ❌ Error leyendo logs del contenedor" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== CORRECCIONES APLICADAS ===" -ForegroundColor Cyan
Write-Host "✅ Mejora en manejo de respuestas JSON vacías" -ForegroundColor Green
Write-Host "✅ Validación de campos mejorada" -ForegroundColor Green
Write-Host "✅ Mensajes de error más informativos" -ForegroundColor Green
Write-Host "✅ Fallback para localStorage creado" -ForegroundColor Green
Write-Host "✅ Auto-hide de mensajes implementado" -ForegroundColor Green

Write-Host ""
Write-Host "📝 INSTRUCCIONES DE PRUEBA:" -ForegroundColor Yellow
Write-Host "1. Abre: http://localhost:8892#contact" -ForegroundColor White
Write-Host "2. Llena el formulario de contacto" -ForegroundColor White
Write-Host "3. Envía el mensaje" -ForegroundColor White
Write-Host "4. Verifica que aparezca mensaje de éxito" -ForegroundColor White
Write-Host "5. Si hay error, debería ser más informativo" -ForegroundColor White

Write-Host ""
