from django.urls import path
from film.api_views import *

urlpatterns = [
    path('film-api/', filmApi, name='film-api'),
    path('film-api/delete/', deleteApi, name='delete'),
    path('film-api/list_create/', FilmListCreate.as_view(), name='film-list-create'),
    path('film-api/retrieve_update_delete/<int:pk>/', FilmRetriveUpdateDelete.as_view(), name='film-retrieve-update-delete'),
]