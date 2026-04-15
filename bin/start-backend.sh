#!/usr/bin/env bash

set -e

source venv/bin/activate

cd backend

uvicorn config.asgi:application --reload --host 0.0.0.0 --port 8000
