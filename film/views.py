#from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import parse_data


@api_view(['GET'])
def filmApi(request):
    parse_data.fn()
    return Response('Data Upload Completed', status=status.HTTP_200_OK)
