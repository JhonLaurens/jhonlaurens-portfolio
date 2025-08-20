# 🚀 Portfolio Profesional - Jhon Laurens

[![Deploy Status](https://github.com/JhonLaurens/jhonlaurens-portfolio/workflows/Deploy%20Portfolio/badge.svg)](https://github.com/JhonLaurens/jhonlaurens-portfolio/actions)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com)
[![Nginx](https://img.shields.io/badge/Nginx-Powered-green.svg)](https://nginx.org)

> **Data Engineer & Database Analyst especializado en Core Banking**  
> Coltefinanciera | AI Specialist | CCNA & Python Certified

## 📋 Tabla de Contenidos

- [🎯 Descripción](#-descripción)
- [🛠️ Tecnologías](#️-tecnologías)
- [🚀 Instalación](#-instalación)
- [🐳 Docker](#-docker)
- [📊 Características](#-características)
- [🔧 Desarrollo](#-desarrollo)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🤝 Contribuir](#-contribuir)

## � DescripciónPortfolio Data Engineer - Core Banking & AI

> **Portfolio profesional de Jhon Laurens, Data Engineer especializado en Core Bancario, IA y Ciberseguridad en Coltefinanciera S.A.**

## � **Descripción**

Portfolio ultra-profesional diseñado para mostrar expertise en:

- 🏛️ **Core Banking**: Migración de 1.2M+ transacciones
- 🤖 **Inteligencia Artificial**: 5+ proyectos implementados
- 🔒 **Ciberseguridad**: ISO 27001 y SARLAFT
- 📊 **Data Engineering**: PostgreSQL, Python, Apache Airflow

## 🐳 **Arquitectura Docker**

### **Servicios Incluidos:**

- **Portfolio Frontend** (Nginx) - Puerto 8892
- **Analytics API** (Node.js) - Puerto 3001
- **PostgreSQL Database** - Puerto 5433
- **Redis Cache** - Puerto 6380
- **Adminer DB Admin** - Puerto 8080
- **Grafana Monitoring** - Puerto 3000

## 🚀 **Quick Start**

### **Opción 1: Deployment Completo**

```bash
# Clonar el repositorio
git clone https://github.com/jhonlaurens/portfolio-data-engineer.git
cd portfolio-data-engineer

# Ejecutar deployment (Windows)
.\deploy.ps1

# Ejecutar deployment (Linux/Mac)
chmod +x deploy.sh
./deploy.sh
```

### **Opción 2: Docker Compose Manual**

```bash
# Construir e iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

5. Vercel detectará automáticamente la configuración
6. Haz clic en "Deploy"

### Opción 2: Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Desplegar
vercel
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos y animaciones
- **JavaScript**: Funcionalidad interactiva y cambio de idioma
- **Bootstrap 5**: Framework CSS responsivo
- **AOS**: Animaciones al hacer scroll
- **Typed.js**: Efecto de escritura animada
- **GLightbox**: Galería de imágenes
- **Swiper**: Carrusel responsivo

## 📁 Estructura del Proyecto

```
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   ├── main.js
│   │   └── translations.js
│   ├── img/
│   └── vendor/
├── forms/
├── index.html
├── vercel.json
└── README.md
```

## 🌐 Funcionalidad Bilingüe

El sitio incluye un sistema completo de traducción:

- **Botón de cambio de idioma** en el header
- **Persistencia** del idioma seleccionado en localStorage
- **Traducción automática** de todo el contenido
- **Soporte para Typed.js** en ambos idiomas

### Agregar nuevas traducciones

Edita el archivo `assets/js/translations.js` y agrega nuevas claves en los objetos `es` y `en`.

## 📱 Responsive Design

El portfolio está optimizado para:

- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1200px+)

## 🎨 Personalización

### Colores

Los colores principales se pueden modificar en `assets/css/main.css` en las variables CSS:

```css
:root {
  --background-color: #1f1f1f;
  --default-color: #ffffff;
  --heading-color: #ffffff;
  --accent-color: #ececec;
  --surface-color: #232323;
}
```

### Contenido

- Edita `index.html` para modificar el contenido
- Actualiza las traducciones en `assets/js/translations.js`
- Reemplaza las imágenes en `assets/img/`

## 📧 Formulario de Contacto

El formulario de contacto está configurado para usar PHP. Para habilitarlo:

1. Configura un servidor con soporte PHP
2. Edita `forms/contact.php` con tu configuración de email
3. Actualiza la acción del formulario en `index.html`

## 🔧 Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/JhonLaurens/jhonlaurens-portfolio.git

# Navegar al directorio
cd jhonlaurens-portfolio

# Servir localmente (usando cualquier servidor HTTP)
npx http-server -p 8000

# O usando Python
python -m http.server 8000
```

Visita `http://localhost:8000` para ver el sitio.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Jhon Laurens**

- GitHub: [@jhonlaurens](https://github.com/jhonlaurens)
- LinkedIn: [jhonlaurens](https://linkedin.com/in/jhonlaurens)

---

⭐ ¡No olvides dar una estrella al repositorio si te gustó el proyecto!
