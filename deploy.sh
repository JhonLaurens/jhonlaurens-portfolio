#!/bin/bash
# Script de deployment para Portfolio Data Engineer
# Autor: Jhon Laurens

echo "🚀 Iniciando deployment del Portfolio Data Engineer..."

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo"
    exit 1
fi

echo "📦 Construyendo imágenes Docker..."

# Construir imagen del portfolio
docker build -t jhon-portfolio:latest .

# Construir imagen de la API
docker build -f api/Dockerfile.api -t portfolio-analytics-api:latest ./api

echo "🗄️ Iniciando servicios..."

# Iniciar todos los servicios
docker-compose up -d

echo "⏳ Esperando que los servicios estén listos..."

# Esperar a que PostgreSQL esté listo
echo "Esperando PostgreSQL..."
until docker exec portfolio-analytics-db pg_isready -U analyst; do
    sleep 2
done

# Esperar a que la API esté lista
echo "Esperando API..."
until curl -f http://localhost:3001/health; do
    sleep 2
done

echo "✅ Deployment completado exitosamente!"
echo ""
echo "🌐 Servicios disponibles:"
echo "   Portfolio:     http://localhost:8892"
echo "   API Analytics: http://localhost:3001"
echo "   Adminer:       http://localhost:8080"
echo "   Grafana:       http://localhost:3000"
echo ""
echo "🔐 Credenciales:"
echo "   Grafana: admin / admin2024"
echo "   PostgreSQL: analyst / secure_password_2024"
echo ""
echo "📊 Para ver logs: docker-compose logs -f"
echo "🛑 Para detener: docker-compose down"
