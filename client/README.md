# Todo Frontend

A responsive Next.js frontend for managing TODOs through the accompanying
NestJS REST API.

## Tech Stack

- Next.js
- React
- TypeScript
- Redux Toolkit
- HeroUI
- Tailwind CSS

## Features

- View, create, edit, and delete TODOs
- Mark TODOs as completed or active
- Search by title or description
- Filter by All, Active, and Completed
- Sort by creation date
- Loading, empty, error, and success states
- Responsive user interface

## Setup

Install the frontend dependencies:

```bash
npm install
```

Create `.env.local` in the `client` directory using `.env.sample` as a
reference:

```bash
NEXT_PUBLIC_REST_API_URL=http://localhost:3001/api
```

## Start the Frontend

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Backend Dependency

The NestJS backend must be running and accessible at:

```text
http://localhost:3001/api
```

## State Management

Redux Toolkit manages TODO state, loading and error states, and API-related
actions. Search, filtering, and sorting are performed in the frontend after the
TODOs are loaded.

## Assumptions and Limitations

- The backend API is running before the frontend is started.
- The frontend expects the TODO API endpoints under `/api/todos`.
- Search, filtering, and sorting operate on the TODOs currently loaded in the
  browser; server-side pagination is outside the assignment scope.
