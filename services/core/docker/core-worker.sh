#!/bin/sh

celery -A config worker -l warning -n worker.default -Q celery --autoscale=${CELERY_AUTOSCALE:-1,1}