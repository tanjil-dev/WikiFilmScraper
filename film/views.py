from django.shortcuts import render

def Home(request):
    return render(request, template_name="home.html")