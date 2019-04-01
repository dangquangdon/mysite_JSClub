FROM node:latest
WORKDIR /mysite_app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]