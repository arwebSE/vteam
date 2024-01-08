# boi

[![Node.js CI](https://github.com/arwebSE/vteam/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/arwebSE/vteam/actions/workflows/node.js.yml)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/arwebSE/vteam/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/arwebSE/vteam/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/arwebSE/vteam/badges/build.png?b=master)](https://scrutinizer-ci.com/g/arwebSE/vteam/build-status/master)

This is the development branch for the main database section of the system.

As of right now, the database is implemented together with a mysql-sever using docker-compose.

## Requirements

-   [Docker](https://www.docker.com/)

## Usage

-   to start services & install dependencies:
    ```
    bash start.bash
    ```
-   to stop services:
    ```
    bash stop.bash
    ```

## Directory Hierarchy

```
|—— backend
|    |—— .gitignore
|    |—— Dockerfile
|    |—— app.js
|    |—— databases
|        |—— sql
|            |—— backenddata.db
|            |—— create_basedbs.sql
|    |—— models
|        |—— user.js
|    |—— package.json
|    |—— routes
|        |—— user.js
|    |—— scooter
|
|—— frontend
|    |—— scooter
|        |—— src
|            |—— components
|                |—— Navbar.js
|            |—— index.css
|            |—— index.js
|            |—— util
|                |—— AuthContext.js
|                |—— authUtils.js
|                |—— withAuth.js
|            |—— views
|                |—— Admin
|                |—— Home
|                    |—— Home.js
|                    |—— style.css
|                |—— Login
|                    |—— Login.js
|                    |—— style.css
|
|—— docker-compose.yaml
|—— start.bash
|—— stop.bash
```

## Code Details

## References

-   [paper-1]()

## License
