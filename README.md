# Wypożyczalnia

## projekt zrobiony w node.js

### Zgodnie z założeniami, projekt umożliwia akcje:
- Rejstracja
- Logowanie
- Dodanie zamochodu
- Utworzenie wypożyczenia
- Pobranie dodanych wypożyczeń

## adres hostowanego api:
[https://wypozyczalnia-nodejs.herokuapp.com/api/](https://wypozyczalnia-nodejs.herokuapp.com/api/)


# Api wykorzystuje JWT Bearer Token oraz zostało podzielone na 4 endpointy:

# /register
## POST

| parametr     |
|--------------|
| email*       |
| imie*        |
| nazwisko     |
| haslo*       |
| powtorzhaslo* |

*-  parametr wymagany

### Przykład użycia:
![rejstracja](./screenshots/Rejestracja.PNG)

# /login
## POST

| parametr     |
|--------------|
|email*|
| haslo*|

*-  parametr wymagany

### Przykład użycia:
![logowanie](./screenshots/Logowanie.PNG)


# /cars
## POST

| parametr     | 
|--------------|
|marka*|
|model*|
|numer_rejestracyjny*|

*-  parametr wymagany

### Przykład użycia:
![dodawanie samochodu](./screenshots/samochod_dodawanie.PNG)

# /rental

## POST
| parametr     ||
|--------------|--|
|start*|data w formacie rrrr-mm-dd|
|koniec*|data w formacie rrrr-mm-dd|
|samochod*| numer rejestracyjny pojazdu|

*-  parametr wymagany

### Przykład użycia:
![dodawanie wypozyczenia](./screenshots/wypozyczenie_dodawanie.PNG)

## GET
|parametr||
|--|-|
|page|nr strony|

*-  parametr wymagany

![historia wypozyczen](./screenshots/wypozyczenie_historia.PNG)

# Przykładowe błędy:

![historia wypozyczen](./screenshots/dodawanie_blad.PNG)
![historia wypozyczen](./screenshots/dodawanie_blad2.PNG)

# Schemat ERD Bazy danych

Jako że w projekcie w node.js nie używałem żadnego ORM, zmieniłem nazwy tabel na liczbę mnogą, aby pasowały do konwencji.

Starałem się korzystać z pól danych w zadaniu, dlatego też jako klucz główny wybrałem email, czy nr. rejestracyjny. Dodałem pole właściciela do tabeli samochody, aby można było zidentyfikować kto go może wypożyczać.

Baza danych na Heroku ma również ograniczenia co do długości kluczy obcych oraz głównych, dlatego email ma długość 100, a nie 250.

![schemat bazy danych](./screenshots/erd.PNG)