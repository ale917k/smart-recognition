# Smart Recognition App

Smart Recognition App is a simple React App for face detection.

## What It Uses:

- Flexbox
- React
- Node.js / Express.js using RESTful API
- JSON
- AJAX
- Relational Database built with PostgreSQL
- Redis as in-memory store db (used for sessions)
- Docker-compose for handling all backend services

## Installation

Make sure to have [git](https://git-scm.com/downloads), [node](https://nodejs.org/en/) and [docker](https://www.docker.com/products/docker-desktop) installed, then run:

```bash
git clone https://github.com/ale917k/smart-recognition
cd ./smart-recognition
npm install
```

Add an `.env` file which looks as follow:

```
# Server
JWT_PSW=secret
CLARIFAI_API_KEY=<clarifai-api-key> # You can grab Clarifai API key here: (https://www.clarifai.com/)

# Postgres
POSTGRES_DEV_URI=postgres://postgres:secret@postgres:5432/smartRecognitionDB
POSTGRES_PRD_URI=postgres://postgres:secret@localhost:5432/smartRecognitionDB

POSTGRES_USER=postgres
POSTGRES_PASSWORD=secret
POSTGRES_DB=smartRecognitionDB
POSTGRES_HOST=postgres

# Redis
REDIS_DEV_URI=redis://redis:6379
REDIS_PRD_URI=redis://localhost:6379
```

You can then run `npm start`; That will boot up all services (client, server, postgres, redis) concurrently.

## License

[MIT](https://choosealicense.com/licenses/mit/)
