FROM node:18.13-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
