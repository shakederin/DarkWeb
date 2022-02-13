FROM node:14-alpine

WORKDIR /usr/src/app/back

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "run", "start" ]
