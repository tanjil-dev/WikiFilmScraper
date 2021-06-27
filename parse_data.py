from bs4 import BeautifulSoup
import requests

res = requests.get('https://en.wikipedia.org/wiki/List_of_Academy_Award-winning_films')
soup = BeautifulSoup(res.text, 'lxml')

match = soup.findAll('i', )
# link = match.a.text
print(match.a)
# print(soup.prettify())