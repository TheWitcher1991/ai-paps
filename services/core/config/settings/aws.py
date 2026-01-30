import os
from pathlib import Path

from config.os import env

USE_S3 = env.bool("USE_S3", default=False)

BASE_DIR = Path(__file__).resolve().parent.parent.parent

AWS_STATIC_LOCATION = "static"
AWS_PUBLIC_MEDIA_LOCATION = "media"
AWS_PRIVATE_MEDIA_LOCATION = "private"

AWS_ACCESS_KEY_ID = env("S3_ACCESS_KEY_ID", default="")
AWS_SECRET_ACCESS_KEY = env("S3_SECRET_ACCESS_KEY", default="")
AWS_STORAGE_BUCKET_NAME = env("S3_STORAGE_BUCKET_NAME", default="")
AWS_S3_ENDPOINT_URL = env("S3_ENDPOINT_URL", default="")
AWS_S3_REGION_NAME = env("S3_REGION_NAME", default="")

AWS_COLD_ACCESS_KEY_ID = env("S3_COLD_ACCESS_KEY_ID", default="")
AWS_COLD_SECRET_ACCESS_KEY = env("S3_COLD_SECRET_ACCESS_KEY", default="")
AWS_COLD_STORAGE_BUCKET_NAME = env("S3_COLD_STORAGE_BUCKET_NAME", default="")
AWS_COLD_ENDPOINT_URL = env("S3_COLD_ENDPOINT_URL", default="")
AWS_COLD_REGION_NAME = env("S3_COLD_REGION_NAME", default="")

if USE_S3:
    AWS_DEFAULT_ACL = None

    AWS_S3_VERIFY = False

    AWS_S3_USE_SSL = False

    AWS_S3_HOST = "s3.timeweb.cloud"

    AWS_S3_CUSTOM_DOMAIN = f"{AWS_S3_HOST}/{AWS_STORAGE_BUCKET_NAME}"

    DEFAULT_FILE_STORAGE = "toolkit.backends.S3MediaStorage"

    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_PUBLIC_MEDIA_LOCATION}/"

    MEDIA_ROOT = os.path.join(BASE_DIR, AWS_STATIC_LOCATION)
else:
    MEDIA_URL = "/mediafiles/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")

STATIC_URL = "/staticfiles/"

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")


STATICFILES_DIRS = (os.path.join(BASE_DIR, "static"),)
