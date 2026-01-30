from config.os import env

DEFAULT_EMAIL_SUBJECT = "myfarm.ru"
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL", default="noreply@myfarm.ru")
EMAIL_HOST = env("EMAIL_HOST", default="mail.myfarm.ru")
EMAIL_PORT = 587
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default="noreply@myfarm.ru")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default=None)
EMAIL_USE_SSL = False
EMAIL_USE_TLS = True
SERVER_EMAIL = EMAIL_HOST_USER
EMAIL_ADMIN = EMAIL_HOST_USER
