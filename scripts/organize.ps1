# Portfolio Organization Script
# Autor: Jhon Laurens - Data Engineer
# Reorganiza el portfolio para GitHub de manera profesional

param(
    [switch]$Execute = $false,
    [switch]$DryRun = $true
)

Write-Host "=== REORGANIZACIÓN AUTOMÁTICA DEL PORTFOLIO ===" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "🔍 MODO SIMULACIÓN - No se realizarán cambios" -ForegroundColor Yellow
    Write-Host "   Usa -Execute para aplicar cambios reales" -ForegroundColor Gray
} else {
    Write-Host "⚠️  MODO EJECUCIÓN - Se aplicarán cambios" -ForegroundColor Red
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
        Write-Host "   📁 Crear: $folder" -ForegroundColor Green
        if ($Execute) {
            New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        }
    } else {
        Write-Host "   ✅ Existe: $folder" -ForegroundColor Gray
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
        Write-Host "   📦 Mover: $file -> $($dockerFiles[$file])" -ForegroundColor Green
        if ($Execute) {
            Move-Item $source $destination -Force
        }
    }
}

# 3. REORGANIZAR SCRIPTS
Write-Host ""
Write-Host "3. REORGANIZANDO SCRIPTS..." -ForegroundColor Yellow

$scriptFiles = Get-ChildItem -Path $rootPath -Filter "*.ps1" | Where-Object { $_.Name -ne "cleanup-and-organize.ps1" }
foreach ($script in $scriptFiles) {
    $destination = Join-Path $rootPath "deployment\scripts\$($script.Name)"
    Write-Host "   📜 Mover: $($script.Name) -> deployment\scripts\" -ForegroundColor Green
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
        Write-Host "   🔧 Mover: $item -> $($backendItems[$item])" -ForegroundColor Green
        if ($Execute) {
            Move-Item $source $destination -Force
        }
    }
}

# 5. CONSOLIDAR DOCUMENTACIÓN
Write-Host ""
Write-Host "5. CONSOLIDANDO DOCUMENTACIÓN..." -ForegroundColor Yellow

$readmeFiles = Get-ChildItem -Path $rootPath -Filter "README*" -Recurse
$readmesToMove = @()

foreach ($readme in $readmeFiles) {
    if ($readme.Name -ne "README.md" -or $readme.DirectoryName -ne $rootPath) {
        $readmesToMove += $readme
        Write-Host "   📄 Consolidar: $($readme.FullName.Replace($rootPath, '.'))" -ForegroundColor Green
    }
}

# 6. LIMPIAR ARCHIVOS DUPLICADOS/INNECESARIOS
Write-Host ""
Write-Host "6. LIMPIANDO ARCHIVOS INNECESARIOS..." -ForegroundColor Yellow

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
        Write-Host "   🗑️  Eliminar: $file" -ForegroundColor Red
        if ($Execute) {
            Remove-Item $fullPath -Force
        }
    }
}

# 7. CREAR ARCHIVOS ESENCIALES
Write-Host ""
Write-Host "7. CREANDO ARCHIVOS ESENCIALES..." -ForegroundColor Yellow

# GitHub workflow
$workflowContent = @"
name: Deploy Portfolio

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker Image
      run: |
        docker build -f deployment/docker/Dockerfile -t portfolio:latest .
    
    - name: Test Container
      run: |
        docker run -d -p 8080:80 --name test-portfolio portfolio:latest
        sleep 10
        curl -f http://localhost:8080 || exit 1
        docker stop test-portfolio
"@

$workflowPath = Join-Path $rootPath ".github\workflows\deploy.yml"
Write-Host "   ⚙️  Crear: GitHub workflow" -ForegroundColor Green
if ($Execute) {
    $workflowContent | Out-File $workflowPath -Encoding UTF8
}

# Dockerfile de producción optimizado
$prodDockerfile = @"
# Dockerfile optimizado para producción
FROM nginx:alpine

# Metadatos
LABEL maintainer="Jhon Laurens <jhon.laurens@example.com>"
LABEL description="Portfolio profesional Data Engineer"
LABEL version="1.0.0"

# Copiar archivos del portfolio
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY forms/ /usr/share/nginx/html/forms/

# Configuración de Nginx
COPY deployment/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Permisos y optimización
RUN chmod -R 644 /usr/share/nginx/html/

# Puerto
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
"@

$prodDockerPath = Join-Path $rootPath "deployment\docker\Dockerfile.prod"
Write-Host "   🐳 Crear: Dockerfile de producción" -ForegroundColor Green
if ($Execute) {
    $prodDockerfile | Out-File $prodDockerPath -Encoding UTF8
}

Write-Host ""
Write-Host "=== RESULTADO FINAL ===" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "✅ Simulación completada sin errores" -ForegroundColor Green
    Write-Host "🔄 Para aplicar cambios ejecuta: .\scripts\organize.ps1 -Execute" -ForegroundColor Yellow
} else {
    Write-Host "✅ Reorganización completada exitosamente" -ForegroundColor Green
    Write-Host "📁 Portfolio listo para GitHub push" -ForegroundColor Cyan
}

Write-Host ""
