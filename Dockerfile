FROM node:9.11.1-alpine

LABEL maintainer="Keid"

RUN mkdir /app
WORKDIR /app

RUN npm install -g yarn nodemon
RUN chmod +x /usr/local/bin/yarn

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install \
  && mv node_modules /node_modules

COPY . .

CMD node server/src/server.js
