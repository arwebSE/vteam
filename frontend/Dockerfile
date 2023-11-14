FROM node:18.17.1

WORKDIR /app

RUN mkdir scooter

COPY ./scooter/package*.json ./scooter/

RUN npm install

COPY . .

CMD ["npm", "start"]