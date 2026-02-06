docker system prune --force

docker compose -f docker-compose.pre.yml build

docker compose -f docker-compose.pre.yml down

# sudo pkill -9 nginx

docker compose -f docker-compose.pre.yml up -d \
  && docker compose -f docker-compose.pre.yml logs -f