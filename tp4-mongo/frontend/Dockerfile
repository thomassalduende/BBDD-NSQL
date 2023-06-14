
FROM node:16.20.0-alpine3.16

WORKDIR /frontend

COPY package.json package-lock.json ./

COPY . .

RUN npm install

CMD npm run dev