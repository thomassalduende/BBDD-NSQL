FROM node:16.20.0-alpine3.16

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD npm run start