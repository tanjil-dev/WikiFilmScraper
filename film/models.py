from django.db import models

# Create your models here.

class films(models.Model):
    movie_name = models.CharField(max_length=255)
    movie_link = models.CharField(max_length=255)
    details = models.CharField(max_length=10000)

    class Meta:
        db_table = "films"

    def __str__(self):
        return self.movie_name
