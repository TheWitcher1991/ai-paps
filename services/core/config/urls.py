from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from config.os import DEBUG
from config.settings import ADMIN_URL, MEDIA_ROOT, MEDIA_URL
from packages.kernel.utils import t

app_name = "config"

admin.site.index_title = t("PAPS")

urlpatterns = [
    path(ADMIN_URL, admin.site.urls),
    path(f"{ADMIN_URL}doc/", include("django.contrib.admindocs.urls")),
    path("v1/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "v1/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-docs",
    ),
    path("v1/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path("", include("django_prometheus.urls")),
    path("v1/", include("datasets.routers", namespace="datasets")),
    path("v1/", include("directory.routers", namespace="directory")),
    path("v1/", include("models.routers", namespace="models")),
    path("v1/", include("projects.routers", namespace="projects")),
    path("v1/", include("recognitions.routers", namespace="recognitions")),
    path("v1/", include("users.routers", namespace="users")),
    path("v1/", include("cvat.routers", namespace="cvat")),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()

if DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
