# Wypożyczalnia

## projekt zrobiony w node.js

### Zgodnie z założeniami, projekt umożliwia akcje:
- Rejstracja
- Logowanie
- Dodanie zamochodu
- Utworzenie wypożyczenia
- Pobranie dodanych wypożyczeń


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

*-  parametr wyamgany

### Przykład użycia:
[rejstracja](screenshots/Rejestracja.png)

# /login
## POST

| parametr     |
|--------------|
|email*|
| haslo*|

*-  parametr wyamgany

### Przykład użycia:
[logowanie](screenshots/Logowanie.png)


# /cars
## POST

| parametr     | 
|--------------|
|marka*|
|model*|
|numer_rejestracyjny*|

*-  parametr wyamgany

### Przykład użycia:
[dodawanie samochodu](screenshots/samochod_dodawanie.png)

# /rental

## POST
| parametr     ||
|--------------|--|
|start*|data w formacie rrrr-mm-dd|
|koniec*|data w formacie rrrr-mm-dd|
|samochod*| numer rejestracyjny pojazdu|

*-  parametr wyamgany

### Przykład użycia:
[dodawanie wypozyczenia](screenshots/wypozyczenie_dodawanie.png)

## GET
|parametr||
|--|-|
|page|nr strony|

*-  parametr wyamgany

[historia wypozyczen](screenshots/wypozyczenie_historia.png)