from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from film.models import *
import parse_data


@api_view(['GET'])
def filmApi(request):
    parse_data.fn()
    return Response('Data Upload Completed.', status=status.HTTP_200_OK)

@api_view(['GET'])
def deleteApi(request):
    films.objects.all().delete()
    return Response('All data has been deleted.', status=status.HTTP_202_ACCEPTED)
