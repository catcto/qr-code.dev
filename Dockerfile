FROM node:16
RUN apt-get update -y && apt-get install -y net-tools && apt-get install vim -y && apt-get clean
WORKDIR /app
COPY . /app/
RUN npm install --production
CMD npm start
