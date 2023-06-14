# Establecer la imagen base
FROM node:16.20.0-alpine3.16

# Establecer el directorio de trabajo en el contenedor
WORKDIR /backend

# Copiar los archivos de la aplicación al contenedor
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . ./

# Exponer el puerto en el contenedor
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
