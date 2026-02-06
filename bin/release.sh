docker system prune --force

docker compose -f docker-compose.prod.yml build

docker compose -f docker-compose.prod.yml down

# sudo pkill -9 nginx

docker compose -f docker-compose.prod.yml up -d \
  && docker compose -f docker-compose.prod.yml logs -f

