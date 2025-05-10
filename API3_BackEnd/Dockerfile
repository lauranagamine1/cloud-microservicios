FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ejecuta app.js
CMD ["node", "app.js"]
