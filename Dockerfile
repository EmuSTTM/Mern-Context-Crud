
FROM node:18.13.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force

# Copia todo el contenido de tu proyecto a la imagen
COPY . .
EXPOSE 4000
RUN npm install react-scripts -g --silent
RUN npm run build && npm start
ENV PORT=4000