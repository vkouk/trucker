FROM node:11.3.0

RUN mkdir -p /usr/src/truck-app
WORKDIR /usr/src/truck-app

COPY package.json /usr/src/truck-app
RUN npm install

COPY . /usr/src/truck-app

ARG NODE_VERSION=11.3.0

ENV NODE_VERSION $NODE_VERSION