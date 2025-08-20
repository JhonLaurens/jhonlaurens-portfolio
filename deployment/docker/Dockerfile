# Dockerfile para Portfolio Data Engineer
FROM nginx:alpine

# Información del mantenedor
LABEL maintainer="jhon.laurens@coltefinanciera.com"
LABEL description="Portfolio profesional de Data Engineer especializado en Core Bancario"
LABEL version="2.0"

# Copiar archivos del portfolio al directorio de nginx
COPY . /usr/share/nginx/html/

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
