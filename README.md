# Cambalache

Web app built in 2018 with [Koa](https://koajs.com/) for university course _IIC2513 — Tecnologías y Aplicaciones Web_ @ _Pontificia Universidad Católica de Chile._

Available at [cambalache.herrera.su](https://cambalache.herrera.su).

## Team: Awebxis-Sanchez

| Name | Github | Email |
|-|-|-|
| José Manuel Comber | [@jmcomber](https://github.com/jmcomber) | jmcomber@uc.cl |
| Raimundo Herrera (maintainer) | [@rjherrera](https://github.com/rjherrera) | rjherrera@uc.cl |
| Javier López | [@javierlopeza](https://github.com/javierlopeza) | javierlopez@uc.cl |

## Requirements

- **Node.js**: `24`
- **Yarn**: `1.22.22`
- **PostgreSQL**: `18`

## Setup

- Clone repository
  ```sh
  git clone https://github.com/rjherrera/cambalache.git
  ````

- Install dependencies:
  ```sh
  corepack enable
  yarn install
  ````

## Environment variables

Minimum required for the app to run against a DB:
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`

Strongly recommended (some features will not work without these):
- `JWT_SECRET`
- `AMAZON_ACCESS_KEY_ID`
- `AMAZON_SECRET_KEY`
- `AMAZON_REGION`
- `CONTAINER_NAME`
- `GOODREADS_KEY`
- `SENDGRID_USERNAME`
- `SENDGRID_PASSWORD`

If you plan to use a SendGrid API key, set `SENDGRID_USERNAME=apikey` and `SENDGRID_PASSWORD=<your_actual_api_key>`.

## Database

- Create a database:
  ```sh
  createdb cambalache_dev
  ```

- Run migrations:
  ```sh
  yarn migrate
  ```

- (Optional) Run seeds:
  ```sh
  yarn sequelize db:seed:all
  ```

Seeds use specific files hosted in a temporary server specified via `SEED_SERVER` env var. Don't use unless you can access those files, or want to replace them with your own.

## Development workflow

You tipically run two procesess:

- Asset watcher (webpack, no HMR)
  ```sh
  yarn dev-assets
  ```

- App server:
  ```sh
  yarn dev
  ```

- Open [http://localhost:3000](http://localhost:3000).


## Useful commands

- Lint:
  ```sh
  yarn lint
  ```

- Migrations:
  ```sh
  yarn migrate
  ```

- Production asset build:
  ```sh
  yarn build-assets
  ```

- App server (non-reloading):
  ```sh
  yarn start
  ```

---

The project was _revamped_ in 2026 to make it work with modern setups. This was developed in 2018, so we upgraded from node 10 to node 24, dropped abandoned dependencies and updated almost all dependencies to their latest available version in that moment in time. Just for the sake of it.
