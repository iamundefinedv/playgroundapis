# 🌐 PlaygroundAPIs.net Backend API 🌐

A simple REST API in Node.js with multiple different endpoints for all kinds of random data. Everything is currently locked behind JWT authentication while in development.

## Quick Start

Clone the repo.

```bash
https://github.com/iamundefinedv/playgroundapis
cd playgroundapis
```
Create the .env file.

```bash
MONGODB_CONNECTION_URL="yourconnectionstring"
```
Install the dependencies.

```bash
yarn install
```
To start the express server, run the following.

```bash
yarn dev
```
`
## API Endpoints

| Methods     | Urls             |Description                |
| ----------- | ---------------- | ------------------------- |
| POST      |   /auth/signup |Authenticate new user|
| POST      |   /api/signin |Authenticate existing user|
| GET         | /api/coffee    |   Get a list of Coffees          |
| GET         | /api/coffee/id |Get a specific Coffee    |
| POST        | /api/coffee    |Create a new Coffee      |
| PUT         | /api/coffee/id |Update an existing Coffee|
| DELETE      | /api/coffee/id |Delete an existing Coffee|
| GET         | /api/tea    |   Get a list of Teas          |
| GET         | /api/tea/id |Get a specific Tea    |
| POST        | /api/tea    |Create a new Tea      |
| PUT         | /api/tea/id |Update an existing Tea|
| DELETE      | /api/tea/id |Delete an existing Tea|