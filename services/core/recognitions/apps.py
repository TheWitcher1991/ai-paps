from django.apps import AppConfig


class RecognitionsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "recognitions"
    label = "recognitions"

    def ready(self):
        import recognitions.signals
