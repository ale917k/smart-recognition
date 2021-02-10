FROM node:12.18.3-stretch

WORKDIR /app/server/

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]