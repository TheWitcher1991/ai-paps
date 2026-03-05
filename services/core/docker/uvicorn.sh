#!/bin/sh

uvicorn -c uvicorn.conf.py config.asgi:application