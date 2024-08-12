from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from film.models import *
from film.serializers import *
from film.fetch_data import fetch
from rest_framework.permissions import AllowAny, IsAdminUser


@api_view(['GET'])
def filmApi(request):
    fetch()
    return Response('Data Upload Completed.', status=status.HTTP_200_OK)

@api_view(['GET'])
def deleteApi(request):
    films.objects.all().delete()
    return Response('All data has been deleted.', status=status.HTTP_202_ACCEPTED)


class FilmListCreate(ListCreateAPIView):
    queryset = films.objects.all()
    serializer_class = FilmSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [AllowAny()]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data})

    def create(self, request, *args, **kwargs):
        self.check_permissions(request)
        return super().create(request, *args, **kwargs)

class FilmRetriveUpdateDelete(RetrieveUpdateDestroyAPIView):
    queryset = films.objects.all()
    serializer_class = FilmSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdminUser()]
        return [AllowAny()]