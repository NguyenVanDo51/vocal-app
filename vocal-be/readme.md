docker run --name lovefi-postgres -v lovefidb:/data/db -e POSTGRES_PASSWORD="g&r*67b2^hsh#0w*m16v^r_qx41=ikii@h" -d -p 5433:5432 postgres

`docker exec -it lovefi-postgres bash`

`psql -U postgres`

`create database lovefi`

`\q`

`exit`

## migrate trong docker container

`docker exec -t -i lovefibe bash`
`python manage.py migrate`


## run local
- Setup venv
- Chạy:
`python3 manage runserver`
