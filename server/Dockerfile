FROM node:8.15.1-alpine

WORKDIR /usr/app

#Install dependencies
COPY package*.json ./

RUN npm install

COPY . .

#Default command
CMD ["npm", "start"]