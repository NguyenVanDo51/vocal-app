docker run --name vocalstripe-postgres -v vocalstripedb:/data/db -e POSTGRES_PASSWORD="g&r*67b2^hsh#0w*m16v^r_qx41=ikii@h" -d -p 5433:5432 postgres

`docker exec -it vocalstripe-postgres bash`

`psql -U postgres`

`create database vocalstripe`

`\q`

`exit`

## migrate trong docker container

`docker exec -t -i vocalstripebe bash`
`python manage.py migrate`


## run local
- Setup venv
- Chạy:
`python3 manage runserver`
