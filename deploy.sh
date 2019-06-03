source .env
docker login registry.gitlab.com -u miguel.alarcos@gmail.com -p $REGISTRY_TOKEN
docker-compose down
yes | docker system prune -a
docker-compose pull && docker-compose up -d

root@testing:~# cat .env 
PORT=8888
REGISTRY_TOKEN=sA3FzQCbHUo5exdbqpsG

version: '3'
services:
  web:
    image: registry.gitlab.com/miguel.alarcos/test-clouding-spa:stagging
    ports:
    - "8888:$PORT"
    environment:
    - PORT
