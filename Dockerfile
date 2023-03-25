
FROM node:18.13.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
ENV MONGODB_URI=mongodb+srv://emusttm:01Tgeqk91B8Vijiy@ecs.siltcam.mongodb.net/MCC?retryWrites=true&w=majority
# Copia todo el contenido de tu proyecto a la imagen
COPY . .
ENV PORT=4000
EXPOSE 4000
RUN npm run build && npm start
