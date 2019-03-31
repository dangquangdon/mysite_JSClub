# MySite Project

This project is a mini full-stack MVC used for learning purposes in [The Shortcut](https://theshortcut.org) JavaScript Club.

Check the [demo](https://jsclub-mysite.herokuapp.com/)

**Technologies used**

- [NodeJS](https://nodejs.org/en/)

- [ExpressJS](https://expressjs.com/)

- [MongoDB](https://www.mongodb.com/) hosted by [Mlab](https://mlab.com/)

- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) as view engine

## Installation

- Clone this repo
  `git clone <remote>`

- Change directory to the cloned folder
  `cd <repo>`

- Install dependencies
  `npm install`

- Run in localhost with nodemon (if you don't have nodemon installed globally, you might need to do that)
  `npm run server`

In localhost, the server is started in port 5000

### Using Docker

- `docker build -t mysite2019`
  you can replace `mysite2019` with your preferred name

- `docker run -it -p 8000:5000 mysite2019`
  this will run the container in your port 8000 (you can change this), the app runs in the container from the port 5000

**To run in the background**

-`docker run -d -p 8000:5000 mysite2019`

TODO:

- Add docker compose

## How it works

For user: - create account - login and create/edit profile - create/add/delete education records - create/add/delete work experience records - create/add/delete projects in portfolio - change avatar image and project thumbnail image
For visitor: - can see everyone's profile using handle name

    `root.domain/home/:handle_name`

## How to follow

Follow the commits of this repo to re-build this project.
