FROM node:22.13.0-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD [ "npm", "run", "dev" ]