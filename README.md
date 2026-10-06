# Todo App

A full-stack TODO application with a NestJS/PostgreSQL API and a responsive
Next.js client.

## Features

- Create, view, edit, complete, reopen, and delete TODOs
- Search by title or description
- Filter by all, active, or completed status
- Sort by creation date
- Request validation and API error handling
- Responsive UI with loading, empty, error, and success states

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Redux Toolkit, HeroUI, Tailwind CSS
- **Backend:** NestJS, TypeScript, PostgreSQL, TypeORM

## Project Structure

```text
todo-app/
|-- client/     # Next.js frontend
|-- server/     # NestJS backend
`-- Readme.md
```

## Prerequisites

- Node.js 20.9 or newer
- npm
- PostgreSQL

## Setup

Create the PostgreSQL database:

```bash
psql -U postgres -c "CREATE DATABASE todo_app;"
```

Create `server/.env` from `server/.env.sample` and `client/.env.local` from
`client/.env.sample`. Then install the dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

## Environment Variables

### Backend — `server/.env`

```bash
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

### Frontend — `client/.env.local`

```bash
NEXT_PUBLIC_REST_API_URL=http://localhost:3001/api
```

## Start the Application

Start the backend from the project root:

```bash
cd server
npm run start:dev
```

In a second terminal, start the frontend:

```bash
cd client
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/todos` | Get all TODOs |
| `POST` | `/api/todos` | Create a TODO |
| `PUT` | `/api/todos/:id` | Update a TODO's title or description |
| `PATCH` | `/api/todos/:id/done` | Toggle completed status |
| `DELETE` | `/api/todos/:id` | Delete a TODO |

## Assumptions and Limitations

- PostgreSQL is available locally and the `todo_app` database has been created.
- TypeORM schema synchronization is enabled for local development only.
- Search, filtering, and sorting are performed in the frontend after loading
  the TODOs.
- Authentication and pagination are outside the scope of this assignment.

See `client/README.md` and `server/README.md` for frontend- and
backend-specific documentation.
