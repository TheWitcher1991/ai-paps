from django.contrib import admin

from training.models import Model, Training, TrainingConfig, TrainingDataset, TrainingRun


@admin.register(Model)
class ModelAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "alias",
        "subset",
        "framework",
        "architecture",
        "backbone",
        "status",
        "created_date",
    )
    list_filter = ("subset", "framework", "architecture", "backbone", "status", "created_date")
    search_fields = ("name", "alias", "description")
    readonly_fields = ("created_date", "updated_date")


class TrainingDatasetInline(admin.TabularInline):
    model = TrainingDataset
    extra = 0
    show_change_link = True
    autocomplete_fields = ("dataset",)


@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "model",
        "created_date",
    )
    list_filter = ("created_date",)
    search_fields = ("name", "description", "model__name")
    readonly_fields = ("created_date", "updated_date")
    autocomplete_fields = ("model",)
    inlines = [TrainingDatasetInline]


@admin.register(TrainingConfig)
class TrainingConfigAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "lr_scheduler",
        "optimizer",
        "loss_function",
        "epochs",
        "learning_rate",
        "created_date",
    )
    list_filter = ("lr_scheduler", "optimizer", "loss_function", "use_flip", "created_date")
    readonly_fields = ("created_date", "updated_date")


@admin.register(TrainingRun)
class TrainingRunAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "training",
        "status",
        "current_epoch",
        "train_loss",
        "val_loss",
        "test_loss",
        "started_date",
        "finished_date",
    )
    list_filter = ("status", "started_date", "finished_date", "created_date")
    search_fields = ("training__name",)
    readonly_fields = ("created_date", "updated_date")
    autocomplete_fields = ("training",)
