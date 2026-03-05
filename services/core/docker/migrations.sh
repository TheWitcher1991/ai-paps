#!/bin/sh

echo "Running makes migrations..."
python manage.py makemigrations

echo "Running migrations..."
python manage.py migrate --skip-checks

echo "Loading fixtures..."
# python manage.py loaddata payments/fixtures/custom_payment_sources.json
# python manage.py loaddata toolkit/fixtures/db.json
# python manage.py loaddata payments/fixtures/payment_methods.json
# python manage.py loaddata rates/fixtures/rates.rate.json
# python manage.py loaddata rates/fixtures/rates.rateprice.json

# echo "Creating superuser..."
# python manage.py initadmin

# echo "Syncing subscriptions story..."
# python manage.py sync_subscriptions_story

# echo "Syncing subscriptions & payments source..."
# python manage.py sync_payments_source
# python manage.py sync_subscriptions_source

# echo "Syncing logins..."
# python manage.py sync_logins

echo "Collecting static files..."
python manage.py collectstatic --noinput

exec "$@"