FROM node:14.18.2

WORKDIR /usr/src/app/api

ENV PATH /usr/src/app/api/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
