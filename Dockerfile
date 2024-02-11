FROM node:20
LABEL authors="prajw"
WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

ENTRYPOINT ["npm","start"]