from django.core.management.base import BaseCommand
from django.db.models import Q

from config.settings import (
    DJANGO_SUPERUSER_EMAIL,
    DJANGO_SUPERUSER_PASSWORD,
    DJANGO_SUPERUSER_PHONE,
    DJANGO_SUPERUSER_USERNAME,
)
from users.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        username = DJANGO_SUPERUSER_USERNAME
        email = DJANGO_SUPERUSER_EMAIL
        password = DJANGO_SUPERUSER_PASSWORD

        if not User.objects.filter(email=email).exists():
            print("Creating account for %s (%s)" % (username, email))
            try:
                User.objects.create_superuser(
                    email=email, password=password, username=username, first_name="admin", last_name="admin", cvat_id=16
                )
            except Exception as e:
                print(f"Failed to create admin account: {str(e)}")
        else:
            print("Admin account has already been initialized.")
