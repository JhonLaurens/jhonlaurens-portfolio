# Jhon Laurens - Portfolio

Portfolio personal de Jhon Laurens, Desarrollador de Software y Especialista en Seguridad de la Información.

## 🌟 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Bilingüe**: Soporte completo para Español e Inglés
- **Moderno**: Diseño limpio y profesional
- **Rápido**: Optimizado para rendimiento
- **SEO Friendly**: Optimizado para motores de búsqueda

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue Directo desde GitHub

1. Ve a [Vercel](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Importa este repositorio: `https://github.com/JhonLaurens/jhonlaurens-portfolio.git`
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