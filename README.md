# Portfolio de Jhon Laurens

## 🚀 Data Engineer & AI Specialist

Portfolio profesional de Jhon Laurens, especialista en ingeniería de datos, inteligencia artificial y sistemas bancarios core.

## 📋 Características

### ✨ Funcionalidades Principales
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Multi-idioma**: Soporte para Español e Inglés
- **Animaciones Suaves**: Implementadas con AOS (Animate On Scroll)
- **Portfolio Interactivo**: Filtrado dinámico de proyectos
- **Formulario de Contacto**: Sistema robusto con validaciones
- **Analytics**: Integración con backend para métricas

### 🛠️ Tecnologías Utilizadas

#### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript ES6+**: Funcionalidades interactivas
- **Bootstrap 5**: Framework CSS responsivo
- **AOS**: Animaciones on scroll
- **Typed.js**: Efectos de escritura animada
- **Swiper**: Carruseles y sliders
- **GLightbox**: Galería de imágenes
- **Isotope**: Filtrado de portfolio

#### Backend (Opcional)
- **Node.js**: Servidor de aplicaciones
- **Express.js**: Framework web
- **PostgreSQL**: Base de datos
- **Redis**: Cache y sesiones
- **Docker**: Containerización

## 🚀 Instalación y Uso

### Opción 1: Servidor Simple (Recomendado para desarrollo)

```bash
# Clonar el repositorio
git clone https://github.com/jhonlaurens/portfolio.git
cd portfolio

# Instalar dependencias (opcional)
npm install

# Iniciar servidor de desarrollo
npm run dev
# o alternativamente:
python -m http.server 8000
```

### Opción 2: Con Backend Completo

```bash
# Clonar el repositorio
git clone https://github.com/jhonlaurens/portfolio.git
cd portfolio

# Usar Docker Compose
docker-compose up -d

# El portfolio estará disponible en:
# - Frontend: http://localhost:8892
# - API: http://localhost:3001
# - Adminer: http://localhost:8080
# - Grafana: http://localhost:3000
```

## 📁 Estructura del Proyecto

```
jhonlaurens-portfolio/
├── assets/
│   ├── css/
│   │   ├── main.css              # Estilos principales
│   │   └── optimizations.css     # Optimizaciones de rendimiento
│   ├── js/
│   │   ├── main.js              # JavaScript principal
│   │   ├── translations.js      # Sistema multi-idioma
│   │   ├── contact-simple.js    # Formulario de contacto
│   │   └── database.js          # Conexión con backend
│   ├── img/                     # Imágenes del portfolio
│   └── vendor/                  # Librerías externas
├── backend/
│   ├── api/
│   │   ├── server.js            # Servidor Express
│   │   └── package.json         # Dependencias del backend
│   └── sql/
│       └── init.sql             # Esquema de base de datos
├── deployment/
│   ├── docker/                  # Configuraciones Docker
│   ├── nginx/                   # Configuración Nginx
│   └── scripts/                 # Scripts de despliegue
├── index.html                   # Página principal
├── package.json                 # Configuración del proyecto
├── docker-compose.yml           # Orquestación de servicios
└── README.md                    # Documentación
```

## 🔧 Configuración

### Variables de Entorno (Backend)

Crear un archivo `.env` en `backend/api/`:

```env
DATABASE_URL=postgresql://analyst:secure_password_2024@localhost:5433/portfolio_analytics
REDIS_URL=redis://localhost:6380
PORT=3001
NODE_ENV=production
```

### Configuración de Base de Datos

La base de datos se inicializa automáticamente con Docker Compose. Incluye:
- Tabla de visitas de página
- Tabla de contactos del portfolio
- Tabla de proyectos destacados
- Métricas de rendimiento
- Vistas para estadísticas

## 🎨 Personalización

### Colores y Temas

Editar las variables CSS en `assets/css/main.css`:

```css
:root {
  --default-color: #fafafa;
  --heading-color: #ffffff;
  --accent-color: #18d26e;
  --surface-color: #212529;
  --contrast-color: #ffffff;
}
```

### Contenido

1. **Información Personal**: Editar `index.html`
2. **Proyectos**: Actualizar la sección portfolio
3. **Traducciones**: Modificar `assets/js/translations.js`
4. **Imágenes**: Reemplazar archivos en `assets/img/`

## 📊 Analytics y Métricas

El portfolio incluye un sistema de analytics que rastrea:
- Visitas por página
- Formularios de contacto
- Tiempo de permanencia
- Dispositivos y navegadores
- Métricas de rendimiento

### Dashboard de Grafana

Acceder a `http://localhost:3000` con:
- Usuario: `admin`
- Contraseña: `admin2024`

## 🔒 Seguridad

### Medidas Implementadas
- **Rate Limiting**: Protección contra spam
- **Validación de Datos**: Sanitización de inputs
- **Headers de Seguridad**: Helmet.js
- **CORS**: Configuración restrictiva
- **Hash de IP**: Anonimización de datos
- **Detección de Spam**: Filtros básicos

### Recomendaciones Adicionales
- Usar HTTPS en producción
- Configurar CSP (Content Security Policy)
- Implementar autenticación para admin
- Backup regular de base de datos

## 🚀 Despliegue

### Netlify/Vercel (Solo Frontend)

1. Conectar repositorio
2. Configurar build command: `npm run build`
3. Directorio de publicación: `./`

### VPS/Cloud (Completo)

```bash
# En el servidor
git clone https://github.com/jhonlaurens/portfolio.git
cd portfolio
docker-compose up -d

# Configurar Nginx como proxy reverso
# Configurar SSL con Let's Encrypt
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Verificar código
npm run lint

# Construir para producción
npm run build
```

## 📈 Optimizaciones Implementadas

### Rendimiento
- ✅ Preload de fuentes críticas
- ✅ Lazy loading de imágenes
- ✅ Minificación de CSS/JS
- ✅ Compresión GZIP
- ✅ Cache de recursos estáticos
- ✅ Optimización de animaciones

### SEO
- ✅ Meta tags optimizados
- ✅ Open Graph para redes sociales
- ✅ Estructura semántica HTML5
- ✅ Sitemap XML
- ✅ Schema.org markup

### Accesibilidad
- ✅ Contraste de colores adecuado
- ✅ Navegación por teclado
- ✅ Textos alternativos
- ✅ ARIA labels
- ✅ Soporte para lectores de pantalla

## 🐛 Solución de Problemas

### Problemas Comunes

**Error de fuentes Google Fonts**
- Verificar conexión a internet
- Comprobar preload de fuentes

**Formulario no envía**
- Verificar configuración del backend
- Revisar console del navegador

**Animaciones no funcionan**
- Verificar carga de AOS
- Comprobar JavaScript habilitado

## 📞 Contacto

- **Email**: jhonlaurens@gmail.com
- **LinkedIn**: [linkedin.com/in/jhonlaurens](https://linkedin.com/in/jhonlaurens)
- **GitHub**: [github.com/jhonlaurens](https://github.com/jhonlaurens)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **BootstrapMade**: Template base SnapFolio
- **Bootstrap Team**: Framework CSS
- **AOS**: Librería de animaciones
- **Typed.js**: Efectos de escritura
- **Comunidad Open Source**: Por las herramientas utilizadas

---

**Desarrollado con ❤️ por Jhon Laurens**

*Transformando datos en valor estratégico*