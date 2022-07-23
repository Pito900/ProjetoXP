FROM node:16

COPY package.json .

RUN npm install

RUN apt-get update
RUN apt-get install lsof

COPY . .

CMD ["npm", "start"]
