from django.urls import path
from film.api_views import *

urlpatterns = [
    path('film-api/', filmApi, name='film-api'),
    path('film-api/delete/',deleteApi, name='delete')
]