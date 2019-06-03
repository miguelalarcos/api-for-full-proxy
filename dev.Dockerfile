FROM node:10-alpine

WORKDIR /usr/src/app

RUN yarn global add nodemon
RUN yarn global add jest

COPY package*.json ./
RUN yarn

COPY . .

CMD [ "nodemon", "index.js" ]
