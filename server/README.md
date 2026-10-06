# Todo Backend

A NestJS REST API for managing TODOs with PostgreSQL persistence through
TypeORM.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM

## Features

- Get all TODOs
- Create a TODO
- Update a TODO's title or description
- Toggle a TODO's completed status
- Delete a TODO
- DTO and UUID parameter validation
- `400 Bad Request` validation responses
- `404 Not Found` responses for missing TODOs

## Setup

Install the backend dependencies:

```bash
npm install
```

Create the PostgreSQL database:

```bash
psql -U postgres -c "CREATE DATABASE todo_app;"
```

Create `.env` in the `server` directory using `.env.sample` as a reference:

```ini
PORT=3001
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=todo_app
DATABASE_SSL=false
DATABASE_SYNCHRONIZE=true
```

Update the database credentials to match your local PostgreSQL configuration.
`DATABASE_SYNCHRONIZE=true` is intended for local development only.

## Start the Backend

```bash
npm run start:dev
```

The backend runs at:

```text
http://localhost:3001
```

## API Endpoints

| Method   | Endpoint              | Description                          |
| -------- | --------------------- | ------------------------------------ |
| `GET`    | `/api/todos`          | Get all TODOs                        |
| `POST`   | `/api/todos`          | Create a TODO                        |
| `PUT`    | `/api/todos/:id`      | Update a TODO's title or description |
| `PATCH`  | `/api/todos/:id/done` | Toggle completed status              |
| `DELETE` | `/api/todos/:id`      | Delete a TODO                        |

## Validation and Error Handling

Request DTOs and UUID route parameters are validated. Invalid requests return
`400 Bad Request`, while requests for missing TODO records return
`404 Not Found`.

## Assumptions and Limitations

- PostgreSQL is expected to be available locally.
- Authentication and multi-user support are outside the scope of this assignment.
- Pagination is not implemented because the application is expected to handle a small TODO dataset. Search, filtering, and sorting are performed on the client after loading the TODOs.
- TypeORM schema synchronization is enabled for local development only and should be disabled in production.
