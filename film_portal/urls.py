from django.contrib import admin
from django.urls import path

from film.views import Parse_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Parse_data.as_view(), name='home')
]
