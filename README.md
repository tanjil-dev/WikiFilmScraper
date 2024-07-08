# WikiFilmScraper

WikiFilmScraper is a web scraping tool designed to extract film names, links, and details from a Wikipedia page containing a table of films.

## Features

- Extracts film names from Wikipedia tables
- Captures links to individual film pages
- Gathers detailed information about each film

## Project Setup
### Clone the repository & enter inside the project directory
```
git clone https://github.com/tanjil-dev/WikiFilmScraper.git
```
```
cd WikiFilmScraper
```
### create virtual environment
```
python -m venv [name]
```

### activate virtual environment(Windows)
```
.[name]\Scripts\activate.bat
```

### activate virtual environment(Linux)
```
source [name]/bin/activate
```

### install all requirements
```
pip install -r requirements.txt
```

### migration query into the default database
```
python manage.py migrate
```

### run server
```
python manage.py runserver
```

## Postgres Database Setup
- Please setup Postgresql RDMS in the local environment. [Tutorial Page](https://join.skype.com/invite/gfDuSdCKc8s9)
- We will avoid putting the database credentials into the settings.py file. Because it will expose your database credential when we will upload code or host our project in public.
## Create .env file using CMD
- From project root directory go we will enter the TodoApp directory.
```
cd WikiFilmScraper
```
- We will make a .env file.
```
touch .env
```
- Copy all the variables from the .sample_env file and paste it into the .env file
- Please put the variable values for database credentials and local directory path etc.

## Thank you!
Thank you for checking out this project! If you have any questions, feel free to open an issue or contact me directly. I hope you find this project helpful and look forward to your contributions.
- **Email:** tanzil.ovi578@gmail.com


### Happy coding!