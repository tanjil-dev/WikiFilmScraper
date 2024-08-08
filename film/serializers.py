from rest_framework.serializers import ModelSerializer
from film.models import *

class FilmSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = films