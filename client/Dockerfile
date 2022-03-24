FROM node:14.18.2

WORKDIR /usr/src/app/my-app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

EXPOSE 3000

CMD ["npm", "start"]
