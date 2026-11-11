# Marcos API

Node + Express + PostgreSQL + Sequelize REST API (user auth, roles, projects).

## Setup (step by step)
1. Install Node.js and PostgreSQL.
2. In this folder run: `npm install`
3. Rename `sample.env` to `.env` and fill in your Postgres username/password.
4. Create the database:   `npx sequelize-cli db:create`
5. Create the tables:     `npx sequelize-cli db:migrate`
6. Add the admin user:    `npx sequelize-cli db:seed:all`
7. Start the server:      `npm run start:dev`
8. Import `Marcos.postman_collection.json` into Postman and test.

## User types
0 = admin, 1 = seller, 2 = buyer

## Endpoints (base: /api/v1)
- POST /auth/signup, POST /auth/login
- POST, GET /projects          (seller only)
- GET, PATCH, DELETE /projects/:id   (seller only)
- GET /users                   (admin only)

## Undo commands
- `npx sequelize-cli db:migrate:undo` (last migration)
- `npx sequelize-cli db:seed:undo:all`
