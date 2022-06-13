FROM node:16.15.0-alpine

LABEL authors="William Suarez B."

WORKDIR /app

# ADD package.json package-lock.json /app/
COPY package*.json ./

RUN npm install

EXPOSE 2409

#ADD . /app

COPY . .

CMD ["node", "server"]
