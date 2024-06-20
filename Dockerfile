FROM node:16.19.0
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5555
CMD npm start