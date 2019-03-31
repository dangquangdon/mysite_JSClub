FROM node:latest
WORKDIR /mysite_app
COPY package.json ./mysite_app
RUN npm install
COPY . /mysite_app
CMD ["npm","start"]