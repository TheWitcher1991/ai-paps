call venv\Scripts\activate

cd services/core

poetry run isort .

poetry run black .