# Nodejs Typescript Template

## Installation

it requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd [project_dir]
yarn install
yarn start:dev
yarn start:devworkers
```

For production environments...

```sh
yarn install --production
NODE_ENV=production yarn start
NODE_ENV=production yarn start:worker
```

## Running with Docker

```sh
run `docker-compose build && docker-compose up -d` to get it up and running
```

## Generate your first API endpoint

```
$ gulp service --name yourFirstEndpoint // This command will create a CRUD endpoint for yourFirstEndpoint.
```

- `[POST] http://localhost:8080/yourFirstEndpoint` Create yourFirstEndpoint resources
- `[GET] http://localhost:8080/yourFirstEndpoint` Get yourFirstEndpoint resources. Supports limits, sorting, pagination, select (projection), search and date range
- `[GET] http://localhost:8080/yourFirstEndpoint/:id` Get a yourFirstEndpoint resource
- `[PUT] http://localhost:8080/yourFirstEndpoint` Update yourFirstEndpoint resources
- `[PATCH] http://localhost:8080/yourFirstEndpoint/:id` Update one yourFirstEndpoint resource
- `[DELETE] http://localhost:8080/yourFirstEndpoint/:id` Delete one yourFirstEndpoint resource

## Versioning your API endpoints

You can create multiple versions of your API endpoints by simply adding the version number to your route file name. eg. `users.v1.js` will put a version of the users resources on the `/v1/users` endpoint. users.v2.js will put a version of the users resources on the `/v2/users` endpoint. The latest version of the resources will always be available at the `/users` endpoint.

> NOTE: This project will automatically load route files found in the routes folder.

## Features

- Custom Error Handlers

```sh
badRequest(500)
unProcessable(422)
forbidden(403)
notFound(404)
unauthorized(401)
badRequest(400)
```

- custom response handlers

```sh
ok(200)
```

- Security

```sh
- Content-Security-Policy: It sets up the Security Policy.
- Expect-CT: It is used for handling Certificate Transparency.
- X-DNS-Prefetch-Control: It is used for controlling the fetching of browser DNS.
- X-Frame-Options: It is used to prevent ClickJacking.
- X-Powered-By: It is used to remove X-Powered-By header. X-Powered-By header leaks the version of the server and its vendor.
- Public-Key-Pins: It is used for HTTP public key pinning.
- Strict-Transport-Security: It is used for HTTP Strict Transport policy.
- X-Download-Options: It restricts to various Download-Options.
- Cache control: It is used for disabling Client-Side caching.
- X-Content-Type-Options: It is used to prevent the Sniffing attack.
-Referrer-Policy: It is used to hide the referrer header.
- X-XSS-Protection: It is used to add protection to XSS attacks.
- HPP: Prevents http pollution attacks.
- DDOS: Prevent DDOS attack through rate limiting
```

- Request Logging

```sh
This can be used for audit purposes.
All request made to the system is logged in the database and includes the IP address, device, request, response, RequestId, method, url
```

- API Caching

```sh
Get request are cached to improve performace
```

- Dynamic cron jobs

```sh
Cron job can be added from the databases by populating the logMongoUrl/Clocks
```

- Authentication

```sh
x-tag needs to be passed in the header or as a query string in order to validate request

bearer authorization header also need to be passed
```

- Third Party request logging

```sh
A custom request library was created under `./src/services/request`, which allows all request made to external APIs to be logged or be recalled if duplicate
```
