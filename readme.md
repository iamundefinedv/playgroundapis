# 🌐 PlaygroundAPIs.net Backend API 🌐

A simple REST API in Node.js with multiple different endpoints for all kinds of random data.

API Endpoints 

| Methods     | Urls             |Description                |
| ----------- | ---------------- | ------------------------- |
| GET         | /api/coffee    |   Get a list of Coffees          |
| GET         | /api/coffee/id |Get a specific Coffee    |
| POST        | /api/coffee    |Create a new Coffee      |
| PUT         | /api/coffee/id |Update an existing Coffee|
| DELETE      | /api/coffee/id |Delete an existing Coffee|

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