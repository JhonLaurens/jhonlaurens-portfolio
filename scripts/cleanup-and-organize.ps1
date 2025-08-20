# Portfolio Cleanup and Organization Script
# Autor: Jhon Laurens - Data Engineer
# Fecha: 19 Agosto 2025

Write-Host "=== ANÁLISIS Y LIMPIEZA DEL PORTFOLIO ===" -ForegroundColor Cyan
Write-Host ""

$rootPath = Split-Path -Parent $PSScriptRoot

# 1. ANÁLISIS DE ARCHIVOS DUPLICADOS
Write-Host "1. ANALIZANDO ARCHIVOS DUPLICADOS..." -ForegroundColor Yellow

# Buscar archivos duplicados por tipo
$duplicateFiles = @()

# Dockerfiles duplicados
Write-Host "   - Dockerfiles encontrados:" -ForegroundColor Gray
Get-ChildItem -Path $rootPath -Filter "Dockerfile*" | ForEach-Object {
    Write-Host "     $($_.Name)" -ForegroundColor White
}

# Scripts PS1 duplicados
Write-Host "   - Scripts PowerShell:" -ForegroundColor Gray
Get-ChildItem -Path $rootPath -Filter "*.ps1" | ForEach-Object {
    Write-Host "     $($_.Name)" -ForegroundColor White
}

# Docker Compose duplicados
Write-Host "   - Docker Compose files:" -ForegroundColor Gray
Get-ChildItem -Path $rootPath -Filter "docker-compose*" | ForEach-Object {
    Write-Host "     $($_.Name)" -ForegroundColor White
}

# READMEs duplicados
Write-Host "   - README files:" -ForegroundColor Gray
Get-ChildItem -Path $rootPath -Filter "README*" -Recurse | ForEach-Object {
    Write-Host "     $($_.FullName.Replace($rootPath, '.'))" -ForegroundColor White
}

Write-Host ""

# 2. ESTRUCTURA RECOMENDADA
Write-Host "2. ESTRUCTURA RECOMENDADA:" -ForegroundColor Yellow
$recommendedStructure = @"
📁 jhonlaurens-portfolio/
├── 📁 .github/               # GitHub workflows y templates
│   └── 📁 workflows/
├── 📁 assets/               # Recursos estáticos
│   ├── 📁 css/
│   ├── 📁 js/
│   ├── 📁 img/
│   └── 📁 vendor/
├── 📁 backend/              # API y servicios
│   ├── 📁 api/
│   └── 📁 sql/
├── 📁 deployment/           # Docker y deployment
│   ├── 📁 docker/
│   ├── 📁 scripts/
│   └── 📁 nginx/
├── 📁 docs/                 # Documentación
├── 📁 forms/                # Formularios de contacto
├── 📄 index.html            # Página principal
├── 📄 .gitignore
└── 📄 README.md
"@

Write-Host $recommendedStructure -ForegroundColor White
Write-Host ""

# 3. ANÁLISIS DE TAMAÑO DE ARCHIVOS
Write-Host "3. ANÁLISIS DE TAMAÑO DE ARCHIVOS:" -ForegroundColor Yellow
$largeFiles = Get-ChildItem -Path $rootPath -Recurse -File | 
    Where-Object { $_.Length -gt 1MB } | 
    Sort-Object Length -Descending |
    Select-Object -First 10

if ($largeFiles) {
    Write-Host "   Archivos grandes (>1MB):" -ForegroundColor Gray
    $largeFiles | ForEach-Object {
        $size = [math]::Round($_.Length / 1MB, 2)
        Write-Host "     $($_.Name) - ${size}MB" -ForegroundColor White
    }
} else {
    Write-Host "   No hay archivos grandes (>1MB)" -ForegroundColor Green
}

Write-Host ""

# 4. VERIFICAR RUTAS EN ARCHIVOS HTML
Write-Host "4. VERIFICANDO RUTAS EN ARCHIVOS HTML..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Path $rootPath -Filter "*.html"
foreach ($file in $htmlFiles) {
    Write-Host "   Analizando: $($file.Name)" -ForegroundColor Gray
    $content = Get-Content $file.FullName -Raw
    
    # Buscar rutas de assets
    $assetPaths = [regex]::Matches($content, '(src|href)="([^"]*assets[^"]*)"') | ForEach-Object { $_.Groups[2].Value }
    if ($assetPaths) {
        Write-Host "     Rutas de assets encontradas: $($assetPaths.Count)" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "=== RECOMENDACIONES ===" -ForegroundColor Cyan
Write-Host "1. Crear carpeta 'deployment' para Docker files" -ForegroundColor White
Write-Host "2. Mover scripts PS1 a 'deployment/scripts'" -ForegroundColor White
Write-Host "3. Consolidar READMEs en uno principal" -ForegroundColor White
Write-Host "4. Crear .github/workflows para CI/CD" -ForegroundColor White
Write-Host "5. Optimizar imágenes grandes si las hay" -ForegroundColor White
Write-Host ""
