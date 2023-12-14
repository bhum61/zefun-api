FROM node:20-alpine

WORKDIR /opt/zefun-api
COPY package.json .
RUN npm install
COPY . .
RUN npm run tsc
CMD npm run deploy

EXPOSE 5000
