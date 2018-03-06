FROM node:9.7.1-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install -g yarn nodemon

COPY package.json package.json
RUN yarn install && mv node_modules /node_modules

COPY . .

LABEL maintainer="Keid"

CMD node server/src/server.js
