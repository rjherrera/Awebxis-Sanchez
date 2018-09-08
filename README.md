# Cambalache

Web app built with [koa](http://koajs.com/) for IIC2513 - Tecnologías y Aplicaciones Web, Pontificia Universidad Católica de Chile.

## Team

| Name             | Github                                           | Email             |
|--------------------|--------------------------------------------------|-------------------|
| José Manuel Comber | [@jmcomber](https://github.com/jmcomber)         | jmcomber@uc.cl    |
| Raimundo Herrera   | [@rjherrera](https://github.com/rjherrera)       | rjherrera@uc.cl   |
| Javier López       | [@javierlopeza](https://github.com/javierlopeza) | javierlopez@uc.cl |

## Prerequisites:
* [PostgreSQL](https://github.com/IIC2513-2017-2/syllabus/wiki/Getting-Started#postgresql)
  * you will need a database with name and user/password as configured in `src/config/database.js`
* [Node.js v8.4.0](https://github.com/IIC2513-2017-2/syllabus/wiki/Node.js) or above
* [Yarn](https://yarnpkg.com)

## Project Setup

* Clone repository
* Install dependencies:
  * `yarn install`

## Database Setup (development)

### Install PostgreSQL
* On Mac OS X using Homebrew: `brew install postgresql`
  * Start service: check [LaunchRocket](https://github.com/jimbojsb/launchrocket) or [lunchy](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/) for postgresql service management
* [Other platforms](https://www.postgresql.org/download/)
* [More details](https://github.com/IIC2513-2017-2/syllabus/wiki/Getting-Started#postgresql)

### Create development database

```sh
createdb cambalache_dev
```

### Run migrations
```sh
npx sequelize db:migrate
```

## Run the app!

```sh
yarn start
```

or directly

```sh
node index.js
```

or, if you want automatic restart after any change in your files

```sh
npx nodemon
```

Now go to http://localhost:3000 and start browsing!
