from django.apps import AppConfig


class DirectoryConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "directory"
    label = "directory"

    def ready(self):
        import directory.signals
