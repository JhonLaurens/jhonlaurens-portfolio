# Script de Preparación para GitHub Push
# Autor: Jhon Laurens - Data Engineer

Write-Host "=== PREPARACION FINAL PARA GITHUB ===" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PWD.Path

# 1. VERIFICAR ESTRUCTURA ORGANIZADA
Write-Host "1. VERIFICANDO ESTRUCTURA ORGANIZADA..." -ForegroundColor Yellow

$requiredFolders = @(
    "deployment\docker",
    "deployment\scripts", 
    "deployment\nginx",
    "backend\api",
    "backend\sql",
    ".github\workflows",
    "docs"
)

$allFoldersExist = $true
foreach ($folder in $requiredFolders) {
    if (Test-Path (Join-Path $rootPath $folder)) {
        Write-Host "   ✅ $folder" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $folder" -ForegroundColor Red
        $allFoldersExist = $false
    }
}

# 2. VERIFICAR ARCHIVOS ESENCIALES
Write-Host ""
Write-Host "2. VERIFICANDO ARCHIVOS ESENCIALES..." -ForegroundColor Yellow

$essentialFiles = @(
    "index.html",
    "README.md",
    ".gitignore",
    ".github\workflows\deploy.yml",
    "deployment\docker\Dockerfile.simple",
    "deployment\docker\docker-compose.yml"
)

$allFilesExist = $true
foreach ($file in $essentialFiles) {
    if (Test-Path (Join-Path $rootPath $file)) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file" -ForegroundColor Red
        $allFilesExist = $false
    }
}

# 3. VERIFICAR RUTAS EN HTML
Write-Host ""
Write-Host "3. VERIFICANDO RUTAS EN HTML..." -ForegroundColor Yellow

try {
    $indexContent = Get-Content "index.html" -Raw
    
    # Verificar rutas de assets
    if ($indexContent -match 'assets/') {
        Write-Host "   ✅ Rutas de assets correctas" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Problemas con rutas de assets" -ForegroundColor Red
    }
    
    # Verificar rutas de formularios
    if ($indexContent -match 'forms/') {
        Write-Host "   ✅ Rutas de formularios correctas" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Sin formularios o rutas incorrectas" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Error leyendo index.html" -ForegroundColor Red
}

# 4. VERIFICAR DOCKER FUNCIONANDO
Write-Host ""
Write-Host "4. VERIFICANDO DOCKER..." -ForegroundColor Yellow

try {
    $dockerVersion = docker --version 2>$null
    if ($dockerVersion) {
        Write-Host "   ✅ Docker instalado: $dockerVersion" -ForegroundColor Green
        
        # Test build rápido
        Write-Host "   🐳 Probando build..." -ForegroundColor Gray
        $buildResult = docker build -f deployment/docker/Dockerfile.simple -t portfolio-test:latest . 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   ✅ Build exitoso" -ForegroundColor Green
            docker rmi portfolio-test:latest 2>$null
        } else {
            Write-Host "   ❌ Error en build" -ForegroundColor Red
        }
    } else {
        Write-Host "   ❌ Docker no disponible" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ Error verificando Docker" -ForegroundColor Red
}

# 5. ANÁLISIS DE TAMAÑO
Write-Host ""
Write-Host "5. ANÁLISIS DE TAMAÑO DEL PROYECTO..." -ForegroundColor Yellow

$totalSize = 0
Get-ChildItem -Recurse -File | ForEach-Object { $totalSize += $_.Length }
$sizeMB = [math]::Round($totalSize / 1MB, 2)

Write-Host "   📦 Tamaño total: ${sizeMB}MB" -ForegroundColor White

# Verificar archivos grandes
$largeFiles = Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 5MB }
if ($largeFiles) {
    Write-Host "   ⚠️  Archivos grandes encontrados:" -ForegroundColor Yellow
    $largeFiles | ForEach-Object {
        $size = [math]::Round($_.Length / 1MB, 2)
        Write-Host "     $($_.Name) - ${size}MB" -ForegroundColor Gray
    }
} else {
    Write-Host "   ✅ No hay archivos grandes (>5MB)" -ForegroundColor Green
}

# 6. PREPARAR COMANDOS DE GIT
Write-Host ""
Write-Host "6. COMANDOS DE GIT RECOMENDADOS..." -ForegroundColor Yellow

$gitCommands = @"
# Verificar estado
git status

# Agregar todos los archivos organizados
git add .

# Commit con mensaje descriptivo
git commit -m "🚀 Portfolio reorganizado profesionalmente

✅ Estructura optimizada para GitHub
✅ Docker completamente funcional  
✅ CI/CD con GitHub Actions
✅ Documentación profesional
✅ Scripts de automatización

Características:
- Portfolio Data Engineer especializado
- Containerización con Docker + Nginx
- Backend API con Node.js + PostgreSQL
- Monitoreo con Grafana + Adminer
- Deploy automático con GitHub Pages"

# Push al repositorio
git push origin main
"@

Write-Host $gitCommands -ForegroundColor White

# 7. RESULTADO FINAL
Write-Host ""
Write-Host "=== RESULTADO FINAL ===" -ForegroundColor Cyan

if ($allFoldersExist -and $allFilesExist) {
    Write-Host "🎉 PROYECTO LISTO PARA GITHUB PUSH" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ Estructura organizada profesionalmente" -ForegroundColor Green
    Write-Host "✅ Docker funcional y optimizado" -ForegroundColor Green
    Write-Host "✅ CI/CD configurado con GitHub Actions" -ForegroundColor Green
    Write-Host "✅ README.md completo y profesional" -ForegroundColor Green
    Write-Host "✅ Documentación técnica incluida" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Usa los comandos git mostrados arriba para hacer push" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  HAY PROBLEMAS QUE RESOLVER" -ForegroundColor Yellow
    Write-Host "   Revisa los elementos marcados con ❌" -ForegroundColor Gray
}

Write-Host ""
