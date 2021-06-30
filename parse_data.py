import time
from bs4 import BeautifulSoup
import requests
def fn(start_time):
    page = requests.get(
        "https://en.wikipedia.org/wiki/List_of_Academy_Award-winning_films")
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find("table", {"class": "wikitable sortable"})

    # print(results.prettify())
    movies = []
    for tr in results.find_all('tr'):
        for td in tr.find_all('td'):
            cnt = 0
            for a in td.find_all('a'):
                starttime = time.time()
                if cnt == 0 and not str(a.text).isdigit():
                    jk = []
                    link = "https://en.wikipedia.org" + a['href']
                    details = requests.get(link)
                    soup1 = BeautifulSoup(details.content, 'html.parser')
                    res = soup1.find("table", {"class": "infobox"})
                    try:
                        for x in res.find_all('tr'):
                            for d in x.find_all('td'):
                                jk.append(d.text)
                        movie = {'movie_name': a.text,
                            'movie_link': "https://en.wikipedia.org" + a['href'],
                             'details': jk
                             }
                        movies.append(movie)
                        print(movie)
                    except:
                        pass
                    endtime = time.time()
                    finish = endtime-starttime
                    print(finish)
                cnt = cnt + 1
    end_time = time.time()
    finish_time = (end_time-start_time)
    print(finish_time)
    print(movies)
if __name__ == '__main__':
    start_time = time.time()
    fn(start_time)


