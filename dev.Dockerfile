FROM node:10-alpine

WORKDIR /usr/src/app

RUN npm install -g nodemon
RUN npm install -g jest

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "nodemon", "index.js" ]
