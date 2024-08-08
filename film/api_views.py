from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from film.models import *
from film.serializers import *
import parse_data


@api_view(['GET'])
def filmApi(request):
    parse_data.fn()
    return Response('Data Upload Completed.', status=status.HTTP_200_OK)

@api_view(['GET'])
def deleteApi(request):
    films.objects.all().delete()
    return Response('All data has been deleted.', status=status.HTTP_202_ACCEPTED)


class FilmListCreate(ListCreateAPIView):
    queryset = films.objects.all()
    serializer_class = FilmSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data})

class FilmRetriveUpdateDelete(RetrieveUpdateDestroyAPIView):
    queryset = films.objects.all()
    serializer_class = FilmSerializer