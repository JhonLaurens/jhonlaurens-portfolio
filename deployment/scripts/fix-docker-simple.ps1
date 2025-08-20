# Script de Solucion para Docker Desktop + WSL2
# Autor: Jhon Laurens - Data Engineer

Write-Host "Solucionando problemas de Docker Desktop con WSL2..." -ForegroundColor Cyan

# Paso 1: Detener Docker Desktop si esta ejecutandose
Write-Host "Paso 1: Deteniendo Docker Desktop..." -ForegroundColor Yellow
try {
    Get-Process "Docker Desktop" -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Host "Docker Desktop detenido" -ForegroundColor Green
} catch {
    Write-Host "Docker Desktop no estaba ejecutandose" -ForegroundColor Yellow
}

# Paso 2: Apagar WSL2 completamente
Write-Host "Paso 2: Apagando WSL2..." -ForegroundColor Yellow
try {
    wsl --shutdown
    Start-Sleep -Seconds 5
    Write-Host "WSL2 apagado correctamente" -ForegroundColor Green
} catch {
    Write-Host "Error apagando WSL2" -ForegroundColor Red
}

# Paso 3: Limpiar distribuciones problematicas de Docker
Write-Host "Paso 3: Limpiando distribuciones de Docker..." -ForegroundColor Yellow
try {
    wsl --unregister docker-desktop 2>$null
    wsl --unregister docker-desktop-data 2>$null
    Write-Host "Distribuciones de Docker limpiadas" -ForegroundColor Green
} catch {
    Write-Host "No se encontraron distribuciones de Docker para limpiar" -ForegroundColor Yellow
}

# Paso 4: Buscar Docker Desktop
Write-Host "Paso 4: Buscando Docker Desktop..." -ForegroundColor Yellow

$dockerPaths = @(
    "C:\Program Files\Docker\Docker\Docker Desktop.exe",
    "C:\Users\$env:USERNAME\AppData\Local\Docker\Docker Desktop.exe"
)

$dockerPath = $null
foreach ($path in $dockerPaths) {
    if (Test-Path $path) {
        $dockerPath = $path
        break
    }
}

if ($dockerPath) {
    Write-Host "Docker Desktop encontrado en: $dockerPath" -ForegroundColor Green
    
    # Paso 5: Iniciar Docker Desktop
    Write-Host "Paso 5: Iniciando Docker Desktop..." -ForegroundColor Yellow
    try {
        Start-Process $dockerPath -WindowStyle Minimized
        Write-Host "Docker Desktop iniciado. Esperando inicializacion..." -ForegroundColor Yellow
        
        # Esperar a que Docker este listo
        $timeout = 120
        $elapsed = 0
        
        do {
            Start-Sleep -Seconds 5
            $elapsed += 5
            try {
                $dockerInfo = docker info 2>$null
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "Docker esta listo!" -ForegroundColor Green
                    break
                }
            } catch {
                # Continuar esperando
            }
            
            Write-Host "Esperando Docker... ($elapsed/$timeout segundos)" -ForegroundColor Gray
        } while ($elapsed -lt $timeout)
        
        if ($elapsed -ge $timeout) {
            Write-Host "Timeout esperando Docker. Verifica manualmente." -ForegroundColor Red
        } else {
            Write-Host ""
            Write-Host "EXITO! Docker esta funcionando correctamente" -ForegroundColor Green
            Write-Host "Ahora puedes ejecutar: docker-compose up -d" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "Error iniciando Docker Desktop" -ForegroundColor Red
    }
} else {
    Write-Host "Docker Desktop no encontrado." -ForegroundColor Red
    Write-Host "Descarga Docker Desktop desde: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Proximos pasos:" -ForegroundColor Cyan
Write-Host "1. Espera a que aparezca el icono de Docker en la bandeja del sistema" -ForegroundColor White
Write-Host "2. Ejecuta: docker version" -ForegroundColor White  
Write-Host "3. Si funciona, ejecuta: docker-compose up -d" -ForegroundColor White
