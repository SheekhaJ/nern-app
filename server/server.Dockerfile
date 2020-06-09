FROM node:slim

RUN mkdir -p /nern-app/server
WORKDIR /nern-app/server

COPY ./server/package.json ./
COPY ./server/package-lock.json ./

RUN npm install

COPY ./server ./

CMD [ "npm", "start" ]