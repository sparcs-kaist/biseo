# Biseo

[![License][badge/license]][license]
[![Conventional Commits][badge/conventional-commits]][conventional-commits]

## Development

### Prerequisites

- `node >=18.0.0`
    - Use [`nvm`](https://github.com/nvm-sh/nvm) or [`pnpm use`](https://pnpm.io/cli/env) to set node version.
- [`pnpm`](https://pnpm.io/)
    - `npm install -g pnpm`
- [`docker`](https://www.docker.com/)

### Setup

1. Fill in the `.env` file.

   ```bash
   cp .env.example .env
   ```
2. Install dependencies and run dev server.

    ```bash
    pnpm i
    pnpm dev
    ```


## Deployment

1. Fill in the `.env` file.

    ```bash
    cp .env.prod.example .env
    ```

2. Build and run the docker image.
    ```bash
    docker-compose up -d --build
    ```

[badge/conventional-commits]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white

[badge/license]: https://img.shields.io/github/license/sparcs-kaist/biseo?color=black

[conventional-commits]: https://conventionalcommits.org

[license]: https://github.com/sparcs-kaist/biseo/blob/main/LICENSE
