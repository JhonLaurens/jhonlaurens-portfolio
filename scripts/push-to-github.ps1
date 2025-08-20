# Script para Push a GitHub
# Autor: Jhon Laurens - Data Engineer

Write-Host "=== PUSH AUTOMATICO A GITHUB ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar estado de Git
Write-Host "1. Verificando estado de Git..." -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain 2>&1
    if ($LASTEXITCODE -eq 0) {
        if ($gitStatus) {
            Write-Host "   📝 Hay cambios para commitear" -ForegroundColor Green
        } else {
            Write-Host "   ✅ Working directory limpio" -ForegroundColor Green
        }
    } else {
        Write-Host "   ❌ Error con Git: $gitStatus" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ Git no disponible" -ForegroundColor Red
    exit 1
}

# 2. Agregar archivos
Write-Host ""
Write-Host "2. Agregando archivos..." -ForegroundColor Yellow
git add .
Write-Host "   ✅ Archivos agregados" -ForegroundColor Green

# 3. Crear commit
Write-Host ""
Write-Host "3. Creando commit..." -ForegroundColor Yellow

$commitMessage = @"
🚀 Portfolio Data Engineer - Reorganización Profesional

✨ Características implementadas:
• 🏗️  Estructura profesional optimizada para GitHub
• 🐳 Docker multi-ambiente (dev/staging/prod)
• ⚙️  CI/CD con GitHub Actions automatizado
• 📊 Backend completo con Node.js + PostgreSQL
• 🔧 Scripts de automatización PowerShell
• 📖 Documentación técnica completa
• 🎨 Frontend responsive con Bootstrap 5

🏢 Especialización:
• Data Engineer en Coltefinanciera
• Core Banking (500M+ transacciones/mes)
• AI & Machine Learning aplicado
• Ciberseguridad ISO 27001
• CCNA & Python certificado

🛠️  Stack Tecnológico:
• Frontend: HTML5, Bootstrap 5, JavaScript ES6+
• Backend: Node.js, Express, PostgreSQL, Redis
• DevOps: Docker, Nginx, GitHub Actions
• Monitoring: Grafana, Adminer, Health Checks

📁 Estructura optimizada:
├── 🎯 assets/ (recursos optimizados)
├── 🔧 backend/ (API + SQL)
├── 🐳 deployment/ (Docker + scripts)
├── 📚 docs/ (documentación)
├── 📝 forms/ (contacto)
└── ⚙️  .github/workflows/ (CI/CD)

Ready for professional deployment! 🚀
"@

try {
    git commit -m $commitMessage
    Write-Host "   ✅ Commit creado exitosamente" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error creando commit" -ForegroundColor Red
    exit 1
}

# 4. Push a GitHub
Write-Host ""
Write-Host "4. Haciendo push a GitHub..." -ForegroundColor Yellow

try {
    git push origin main
    Write-Host "   ✅ Push exitoso a GitHub!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error en push. Verificar conexión/permisos" -ForegroundColor Red
    Write-Host "   💡 Comando manual: git push origin main" -ForegroundColor Yellow
}

# 5. Resultado final
Write-Host ""
Write-Host "=== RESULTADO FINAL ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 PORTFOLIO SUBIDO A GITHUB EXITOSAMENTE!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Próximos pasos:" -ForegroundColor Yellow
Write-Host "   1. Verificar en GitHub que todos los archivos subieron" -ForegroundColor White
Write-Host "   2. Configurar GitHub Pages en Settings > Pages" -ForegroundColor White
Write-Host "   3. Esperar deployment automático (~2-3 minutos)" -ForegroundColor White
Write-Host "   4. Acceder a: https://username.github.io/repository-name" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Para development local:" -ForegroundColor Yellow
Write-Host "   docker build -f deployment/docker/Dockerfile.simple -t portfolio ." -ForegroundColor Gray
Write-Host "   docker run -d -p 8080:80 portfolio" -ForegroundColor Gray
Write-Host ""
Write-Host "🌟 Tu portfolio profesional está listo para Coltefinanciera!" -ForegroundColor Cyan
Write-Host ""
