FROM node:slim

RUN mkdir -p /nern-app/client
WORKDIR /nern-app/client

COPY ./client/package.json ./
COPY ./client/package-lock.json ./

RUN npm install

COPY ./client ./

CMD [ "npm", "start" ]