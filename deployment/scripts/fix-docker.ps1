# 🔧 Script de Solución para Docker Desktop + WSL2
# Autor: Jhon Laurens - Data Engineer

Write-Host "🔧 Solucionando problemas de Docker Desktop con WSL2..." -ForegroundColor Cyan

# Función para ejecutar como administrador si es necesario
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Paso 1: Detener Docker Desktop si está ejecutándose
Write-Host "📋 Paso 1: Deteniendo Docker Desktop..." -ForegroundColor Yellow
try {
    Get-Process "Docker Desktop" -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Host "✅ Docker Desktop detenido" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Docker Desktop no estaba ejecutándose" -ForegroundColor Yellow
}

# Paso 2: Apagar WSL2 completamente
Write-Host "📋 Paso 2: Apagando WSL2..." -ForegroundColor Yellow
try {
    wsl --shutdown
    Start-Sleep -Seconds 5
    Write-Host "✅ WSL2 apagado correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error apagando WSL2: $($_.Exception.Message)" -ForegroundColor Red
}

# Paso 3: Limpiar distribuciones problemáticas de Docker
Write-Host "📋 Paso 3: Limpiando distribuciones de Docker..." -ForegroundColor Yellow
try {
    # Intentar desregistrar las distribuciones de Docker
    wsl --unregister docker-desktop 2>$null
    wsl --unregister docker-desktop-data 2>$null
    Write-Host "✅ Distribuciones de Docker limpiadas" -ForegroundColor Green
} catch {
    Write-Host "⚠️  No se encontraron distribuciones de Docker para limpiar" -ForegroundColor Yellow
}

# Paso 4: Verificar WSL2
Write-Host "📋 Paso 4: Verificando configuración de WSL2..." -ForegroundColor Yellow
try {
    $wslVersion = wsl --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ WSL2 está instalado" -ForegroundColor Green
    } else {
        Write-Host "❌ WSL2 no está instalado correctamente" -ForegroundColor Red
        Write-Host "🔗 Instala WSL2 desde: https://aka.ms/wsl2kernel" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Error verificando WSL2" -ForegroundColor Red
}

# Paso 5: Iniciar Docker Desktop con configuración limpia
Write-Host "📋 Paso 5: Iniciando Docker Desktop..." -ForegroundColor Yellow

# Buscar Docker Desktop en ubicaciones comunes
$dockerPaths = @(
    "C:\Program Files\Docker\Docker\Docker Desktop.exe",
    "C:\Users\$env:USERNAME\AppData\Local\Docker\Docker Desktop.exe",
    "${env:ProgramFiles}\Docker\Docker\Docker Desktop.exe"
)

$dockerPath = $null
foreach ($path in $dockerPaths) {
    if (Test-Path $path) {
        $dockerPath = $path
        break
    }
}

if ($dockerPath) {
    Write-Host "✅ Docker Desktop encontrado en: $dockerPath" -ForegroundColor Green
    try {
        Start-Process $dockerPath -WindowStyle Minimized
        Write-Host "🚀 Docker Desktop iniciado. Esperando inicialización..." -ForegroundColor Yellow
        
        # Esperar a que Docker esté listo
        $timeout = 120 # 2 minutos
        $elapsed = 0
        
        do {
            Start-Sleep -Seconds 5
            $elapsed += 5
            try {
                $dockerInfo = docker info 2>$null
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✅ Docker está listo!" -ForegroundColor Green
                    break
                }
            } catch {}
            
            Write-Host "⏳ Esperando Docker... ($elapsed/$timeout segundos)" -ForegroundColor Gray
        } while ($elapsed -lt $timeout)
        
        if ($elapsed -ge $timeout) {
            Write-Host "❌ Timeout esperando Docker. Verifica manualmente." -ForegroundColor Red
        }
        
    } catch {
        Write-Host "❌ Error iniciando Docker Desktop: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Docker Desktop no encontrado. Instalando..." -ForegroundColor Red
    Write-Host "🔗 Descarga Docker Desktop desde: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    
    # Opción de descarga automática
    $download = Read-Host "¿Deseas descargar Docker Desktop automáticamente? (y/n)"
    if ($download -eq 'y' -or $download -eq 'Y') {
        Write-Host "📥 Descargando Docker Desktop..." -ForegroundColor Yellow
        try {
            $url = "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
            $output = "$env:TEMP\DockerDesktopInstaller.exe"
            Invoke-WebRequest -Uri $url -OutFile $output
            Write-Host "✅ Descarga completada. Ejecutando instalador..." -ForegroundColor Green
            Start-Process $output -Wait
        } catch {
            Write-Host "❌ Error descargando Docker Desktop: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "🎯 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Espera a que aparezca el ícono de Docker (ballena) en la bandeja del sistema" -ForegroundColor White
Write-Host "2. Una vez que Docker esté listo, ejecuta: docker version" -ForegroundColor White
Write-Host "3. Si funciona, ejecuta: .\deploy.ps1" -ForegroundColor White
Write-Host ""
