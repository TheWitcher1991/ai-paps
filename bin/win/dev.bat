call venv\Scripts\activate

cd services/core

uvicorn config.asgi:application --reload --host 0.0.0.0 --port 8000