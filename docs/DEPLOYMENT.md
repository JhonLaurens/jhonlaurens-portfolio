# Documentación de Deployment

## Guía de Deployment

### Pre-requisitos

- Docker Desktop instalado
- Git configurado
- PowerShell 5.1+ (Windows)

### Deployment Local

1. **Clonar repositorio**

```bash
git clone https://github.com/JhonLaurens/jhonlaurens-portfolio.git
cd jhonlaurens-portfolio
```

2. **Build y Deploy con Docker**

```bash
# Opción simple (solo frontend)
docker build -f deployment/docker/Dockerfile.simple -t portfolio:latest .
docker run -d -p 8080:80 --name portfolio portfolio:latest

# Opción completa (con backend)
docker-compose -f deployment/docker/docker-compose.yml up -d
```

3. **Verificar deployment**

```bash
# Usar script de verificación
.\deployment\scripts\verify-docker.ps1

# O manual
curl http://localhost:8080
```

### Deployment en Producción

#### GitHub Pages

1. Push a rama `main`
2. GitHub Actions ejecuta automáticamente
3. Portfolio disponible en: `https://username.github.io/jhonlaurens-portfolio`

#### VPS/Cloud Server

```bash
# Conectar al servidor
ssh user@your-server.com

# Clonar y deploy
git clone https://github.com/JhonLaurens/jhonlaurens-portfolio.git
cd jhonlaurens-portfolio
docker-compose -f deployment/docker/docker-compose.yml up -d

# Configurar proxy reverso (Nginx)
sudo nano /etc/nginx/sites-available/portfolio
```

### Monitoreo y Mantenimiento

#### Health Checks

```bash
# Manual
curl -f http://localhost:8080/health || echo "Service Down"

# Automatizado con script
.\deployment\scripts\check-health.ps1
```

#### Logs

```bash
# Ver logs del contenedor
docker logs portfolio-container

# Logs en tiempo real
docker logs -f portfolio-container
```

#### Backup

```bash
# Backup de base de datos
docker exec postgres-container pg_dump -U user portfolio_db > backup.sql

# Backup de archivos estáticos
tar -czf portfolio-backup.tar.gz assets/ forms/ *.html
```

### Troubleshooting

#### Problemas Comunes

1. **Puerto ocupado**

```bash
# Verificar qué usa el puerto
netstat -ano | findstr :8080
# Matar proceso si es necesario
taskkill /PID <PID> /F
```

2. **Contenedor no inicia**

```bash
# Ver logs de error
docker logs portfolio-container
# Verificar Dockerfile
docker build --no-cache -f deployment/docker/Dockerfile .
```

3. **Problemas de permisos**

```bash
# En Linux/macOS
sudo chown -R $USER:$USER .
chmod +x deployment/scripts/*.sh
```

### Performance Optimization

#### Nginx Tuning

- Configuración en `deployment/nginx/nginx.conf`
- Gzip compression habilitado
- Cache headers optimizados

#### Docker Optimization

- Multi-stage builds para reducir tamaño
- .dockerignore para excluir archivos innecesarios
- Health checks configurados

#### Frontend Optimization

- Imágenes optimizadas a WebP
- CSS/JS minificado
- Lazy loading implementado
