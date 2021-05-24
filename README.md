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

![schemat bazy danych](./screenshots/erd.PNG)