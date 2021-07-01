from django.db import models

# Create your models here.

class films(models.Model):
    movie_name = models.CharField(max_length=50)
    movie_link = models.CharField(max_length=200)
    details = models.CharField(max_length=10000)

    class Meta:
        db_table = "films"
