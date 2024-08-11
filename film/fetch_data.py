from film.models import films
from concurrent.futures import ThreadPoolExecutor, as_completed
import time
import re
import requests
from bs4 import BeautifulSoup

#Code-Version(2)
def clean_details(details_list):
    cleaned_details = []
    for detail in details_list:
        # Remove newlines, brackets, and any text starting with backslash
        detail = re.sub(r'\[.*?\]|\\.*?|\n', '', detail)  # Remove brackets, backslash objects, and newlines
        detail = detail.strip()  # Remove leading and trailing whitespace
        if detail:  # Ensure it's not empty after cleaning
            cleaned_details.append(detail)
    return ', '.join(cleaned_details)  # Join all cleaned details into a single string


def fetch_movie_details(a):
    try:
        jk = []
        link = "https://en.wikipedia.org" + a['href']
        details = requests.get(link)
        soup1 = BeautifulSoup(details.content, 'html.parser')
        res = soup1.find("table", {"class": "infobox"})
        for x in res.find_all('tr'):
            for d in x.find_all('td'):
                jk.append(d.text)
        cleaned_jk = clean_details(jk)  # Clean the details list
        movie = {'movie_name': a.text, 'movie_link': link, 'details': cleaned_jk}
        return movie
    except Exception as e:
        print(f"Error fetching details for {a.text}: {e}")
        return None


def fetch():
    start_time = time.time()
    page = requests.get("https://en.wikipedia.org/wiki/List_of_Academy_Award-winning_films")
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find("table", {"class": "wikitable sortable"})
    count = 0
    film_data = []
    max_workers = 8  # Optimal for MacBook Air M1

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = []
        for tr in results.find_all('tr'):
            for td in tr.find_all('td'):
                cnt = 0
                for a in td.find_all('a'):
                    if cnt == 0 and not str(a.text).isdigit():
                        futures.append(executor.submit(fetch_movie_details, a))
                    cnt += 1

        for future in as_completed(futures):
            movie = future.result()
            if movie:
                film_data.append(films(movie_name=movie['movie_name'], movie_link=movie['movie_link'], details=movie['details']))
                count += 1
                print(count, " ", movie['movie_name'], " ", movie['movie_link'], " ", movie['details'])

    films.objects.bulk_create(film_data)
    end_time = time.time()
    finish_time = (end_time - start_time)
    print(f"Scraping completed in {finish_time} seconds")