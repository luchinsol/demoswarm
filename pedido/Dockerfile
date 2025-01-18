# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json (si existe) primero para aprovechar la caché de Docker
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos al contenedor
COPY . .

# Expone el puerto que el servicio va a utilizar dentro del contenedor
EXPOSE 5001

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
