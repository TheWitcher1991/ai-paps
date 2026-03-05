#!/bin/sh

echo "Starting Gunicorn..."
gunicorn -c gunicorn.conf.py config.wsgi:application