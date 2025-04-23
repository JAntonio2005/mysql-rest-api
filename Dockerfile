# Usa una imagen base oficial de Node.js
FROM node:20

# Crea el directorio de la app en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el resto del proyecto
COPY . .

# Expone el puerto del backend
EXPOSE 3000

# Comando para levantar el servidor
CMD ["node", "index.js"]
