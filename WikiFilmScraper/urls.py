from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from film.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('film.urls')),
    path('', Home.as_view(), name='home'),
]
