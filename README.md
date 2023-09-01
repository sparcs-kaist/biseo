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

### Commit

This project uses [Conventional Commits][conventional-commits] for commit messages. Refer to the [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/#summary) for more details.

This project uses Husky to run lint and test before commit. If you have `"Command not found: nvm"` errors when the precommit hooks are executed, add following lines to your `.huskyrc`(Refer to [Husky troubleshooting](https://typicode.github.io/husky/troubleshooting.html#command-not-found)).

```bash
# This loads nvm.sh, sets the correct PATH before running hook, and ensures the project version of Node
export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# If you have an .nvmrc file, we use the relevant node version
if [[ -f ".nvmrc" ]]; then
  nvm use
fi
```

## Deployment

1. Fill in the `.env` file.

   ```bash
   cp .env.prod.example .env
   ```

2. Create an external volume for database.

   ```bash
   docker volume create biseo-data
   ```

3. Build and run the docker image.
   ```bash
   docker-compose up -d --build
   ```

[badge/conventional-commits]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white
[badge/license]: https://img.shields.io/github/license/sparcs-kaist/biseo?color=black
[conventional-commits]: https://conventionalcommits.org
[license]: https://github.com/sparcs-kaist/biseo/blob/main/LICENSE
