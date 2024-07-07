from django.shortcuts import render
from film.models import *

def Home(request):
    data = films.objects.all()
    context = {
        'data': data
    }
    return render(request, template_name="home.html", context=context)