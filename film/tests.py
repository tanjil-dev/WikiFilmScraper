from django.test import TestCase
from film.models import films

class FilmModelTest(TestCase):
    def test_film_model_exists(self):
        film = films.objects.count()
        self.assertEqual(film, 0)

    def test_model_has_string_representation(self):
        film = films.objects.create(movie_name='Harry Potter', movie_link='https://en.wikipedia.org/wiki/Harry_Potter', details='xyz')
        self.assertEqual(str(film), film.movie_name)
        self.assertEqual(str(film), film.movie_link)
        self.assertEqual(str(film), film.details)