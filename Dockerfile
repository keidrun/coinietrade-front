FROM node:10.9.0-alpine

LABEL maintainer="Keid"

RUN mkdir /app
WORKDIR /app

RUN npm config set registry "https://registry.npmjs.org"
RUN npm install -g yarn@1.9.4
RUN chmod +x /usr/local/bin/yarn

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install \
  && mv node_modules /node_modules

COPY . .

CMD node server/src/server.js
