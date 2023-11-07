FROM node:18.17.1 as builder
RUN mkdir /app
WORKDIR /app
COPY ./e-scooter/package.json .
RUN npm install
COPY ./e-scooter .
EXPOSE 3000
CMD ["npm", "start"]
