#!/bin/bash
set -e

echo "Deploy mode: $MODE"

ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" "
    cd $PROJECT_DIR && \
    git pull origin $BRANCH_NAME && \
    docker system prune --force && \
    docker compose -f $DOCKER_COMPOSE_FILE down && \
    docker compose -f $DOCKER_COMPOSE_FILE build && \
    docker compose -f $DOCKER_COMPOSE_FILE up -d
"