FROM node:16.15.0-alpine

WORKDIR /app

ADD package.json package-lock.json /app/
RUN npm install

EXPOSE 2409

ADD . /app

CMD ["node", "server"]
