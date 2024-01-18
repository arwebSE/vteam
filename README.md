# boi

[![Node.js CI](https://github.com/arwebSE/vteam/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/arwebSE/vteam/actions/workflows/node.js.yml)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/arwebSE/vteam/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/arwebSE/vteam/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/arwebSE/vteam/badges/build.png?b=master)](https://scrutinizer-ci.com/g/arwebSE/vteam/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/arwebSE/vteam/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/arwebSE/vteam/?branch=master)

This is our project for the "vteam" course, where we have made a service that allows the users to hire electronic kickbikes.
A simulation of the service running with multiple hypothetical users is also avaliable in the simulation environment. 
(INSTRUCTIONS FOR RUNNING SIMULATION)

## Requirements
-   [SpatiaLite](https://www.gaia-gis.it/fossil/libspatialite/index)
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
