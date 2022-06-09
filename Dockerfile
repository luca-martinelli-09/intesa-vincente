FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

USER node

RUN npm build

CMD [ "npm", "start" ]