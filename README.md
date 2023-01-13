# Biseo

[![License][badge/license]][license]
[![Conventional Commits][badge/conventional-commits]][conventional-commits]

## Usage

1. Run the command below and fill in the `.env` file.

   ```bash
   cp .env.example .env
   ```

2. Create an SSH key via the `ssh-keygen` command. Then place the public key with
   the `.pub` filename extension in the same directory as the `dev.Dockerfile`.

3. Create and start containers.

   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

4. You can connect to the container via SSH.

   ```bash
   ssh -i <private_key> -p <port> root@<host_name>
   ```

[badge/conventional-commits]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white
[badge/license]: https://img.shields.io/github/license/sparcs-kaist/biseo?color=black
[conventional-commits]: https://conventionalcommits.org
[license]: https://github.com/sparcs-kaist/biseo/blob/main/LICENSE
