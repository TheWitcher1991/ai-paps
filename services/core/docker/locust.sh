#!/bin/sh

echo "Starting locust..."
locust -f locustfile.py -u 10 -r 2