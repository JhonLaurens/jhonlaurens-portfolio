# Portfolio Organization Script
# Autor: Jhon Laurens - Data Engineer
# Reorganiza el portfolio para GitHub de manera profesional

param(
    [switch]$Execute = $false,
    [switch]$DryRun = $true
)

Write-Host "=== REORGANIZACION AUTOMATICA DEL PORTFOLIO ===" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "MODO SIMULACION - No se realizaran cambios" -ForegroundColor Yellow
    Write-Host "   Usa -Execute para aplicar cambios reales" -ForegroundColor Gray
} else {
    Write-Host "MODO EJECUCION - Se aplicaran cambios" -ForegroundColor Red
}

Write-Host ""

$rootPath = Split-Path -Parent $PSScriptRoot

# 1. CREAR ESTRUCTURA DE CARPETAS
Write-Host "1. CREANDO ESTRUCTURA DE CARPETAS..." -ForegroundColor Yellow

$newFolders = @(
    "deployment",
    "deployment\docker",
    "deployment\scripts", 
    "deployment\nginx",
    "backend",
    "docs",
    ".github",
    ".github\workflows"
)

foreach ($folder in $newFolders) {
    $fullPath = Join-Path $rootPath $folder
    if (-not (Test-Path $fullPath)) {
        Write-Host "   Crear: $folder" -ForegroundColor Green
        if ($Execute) {
            New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        }
    } else {
        Write-Host "   Existe: $folder" -ForegroundColor Gray
    }
}

# 2. REORGANIZAR ARCHIVOS DOCKER
Write-Host ""
Write-Host "2. REORGANIZANDO ARCHIVOS DOCKER..." -ForegroundColor Yellow

$dockerFiles = @{
    "Dockerfile" = "deployment\docker\Dockerfile"
    "Dockerfile.simple" = "deployment\docker\Dockerfile.simple"
    "docker-compose.yml" = "deployment\docker\docker-compose.yml"
    "docker-compose-simple.yml" = "deployment\docker\docker-compose-simple.yml"
    "nginx.conf" = "deployment\nginx\nginx.conf"
}

foreach ($file in $dockerFiles.Keys) {
    $source = Join-Path $rootPath $file
    $destination = Join-Path $rootPath $dockerFiles[$file]
    
    if (Test-Path $source) {
        Write-Host "   Mover: $file -> $($dockerFiles[$file])" -ForegroundColor Green
        if ($Execute) {
            Move-Item $source $destination -Force
        }
    }
}

# 3. REORGANIZAR SCRIPTS
Write-Host ""
Write-Host "3. REORGANIZANDO SCRIPTS..." -ForegroundColor Yellow

$scriptFiles = Get-ChildItem -Path $rootPath -Filter "*.ps1" | Where-Object { $_.Name -notin @("cleanup-and-organize.ps1", "organize.ps1") }
foreach ($script in $scriptFiles) {
    $destination = Join-Path $rootPath "deployment\scripts\$($script.Name)"
    Write-Host "   Mover: $($script.Name) -> deployment\scripts\" -ForegroundColor Green
    if ($Execute) {
        Move-Item $script.FullName $destination -Force
    }
}

# 4. REORGANIZAR BACKEND
Write-Host ""
Write-Host "4. REORGANIZANDO BACKEND..." -ForegroundColor Yellow

$backendItems = @{
    "api" = "backend\api"
    "sql" = "backend\sql"
}

foreach ($item in $backendItems.Keys) {
    $source = Join-Path $rootPath $item
    $destination = Join-Path $rootPath $backendItems[$item]
    
    if (Test-Path $source) {
        Write-Host "   Mover: $item -> $($backendItems[$item])" -ForegroundColor Green
        if ($Execute) {
            Move-Item $source $destination -Force
        }
    }
}

# 5. LIMPIAR ARCHIVOS DUPLICADOS/INNECESARIOS
Write-Host ""
Write-Host "5. LIMPIANDO ARCHIVOS INNECESARIOS..." -ForegroundColor Yellow

$filesToRemove = @(
    "Readme.txt",
    "deploy.sh",
    "Makefile",
    "package-lock.json",
    "package.json",
    "vercel.json"
)

foreach ($file in $filesToRemove) {
    $fullPath = Join-Path $rootPath $file
    if (Test-Path $fullPath) {
        Write-Host "   Eliminar: $file" -ForegroundColor Red
        if ($Execute) {
            Remove-Item $fullPath -Force
        }
    }
}

Write-Host ""
Write-Host "=== RESULTADO FINAL ===" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "Simulacion completada sin errores" -ForegroundColor Green
    Write-Host "Para aplicar cambios ejecuta: .\scripts\organize.ps1 -Execute" -ForegroundColor Yellow
} else {
    Write-Host "Reorganizacion completada exitosamente" -ForegroundColor Green
    Write-Host "Portfolio listo para GitHub push" -ForegroundColor Cyan
}

Write-Host ""
