from django.urls import path
from film.views import *

urlpatterns = [
    path('film-api/', filmApi, name='film-api'),
]