
const express= require('express');
const router = express.Router();

db = require('../db/db');

//rejestracja nowego użytkownika
router.post('/register', async (req,res) => {

    //sprawdź czy są wszystkie wymagane pola
    if (!req.body.email || !req.body.imie || !req.body.haslo || !req.body.powtorzhaslo) {
        answer(res,400,"Brak wszystkich danych")
    }
    //sprawdź czy hasła się zgadzają
    else if (req.body.haslo != req.body.powtorzhaslo) {
        answer(res,400,"Hasla sie nie zgadzaja")
    }
    else{
        //sprawdź poprawność danych
        regex_email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/gm
        regex_imie=/^[a-zA-Z]{2,50}/gm
        regex_nazwisko=/^[a-zA-Z]{2,100}/gm
        regex_haslo=/^.*(?=.[a-z]{1,})(?=.*[A-Z]{1,}).*/gm

        if (
            req.body.email.match(regex_email) &&
            req.body.imie.match(regex_imie) &&
            req.body.nazwisko? req.body.nazwisko.match(regex_nazwisko) : true &&
            req.body.haslo.match(regex_haslo) &&
            req.body.haslo.length >= 7
        ) {
            //stworzenie nowego użytkownika
            let sql,param
            if (req.body.nazwisko) {
                sql = "INSERT INTO `agent` (`email`, `imie`, `nazwisko`, `haslo`) VALUES (?, ?, ?, ?)"
                param = [req.body.email, req.body.imie, req.body.nazwisko, req.body.haslo]
            }
            else{
                sql = "INSERT INTO `agent` (`email`, `imie`, `haslo`) VALUES (?, ?, ?)"
                param = [req.body.email, req.body.imie, req.body.haslo]
            }

            db.preparedQuery(sql,param)
            

            answer(res,201,"Utworzono pomyślnie")
        }
        else{
            answer(res,400,"Niepoprawne dane")
        }
    }
    
})

router.post('/login', async (req,res) => {

    if (!req.body.email || !req.body.haslo) 
        answer(res,400)


    res.send({"abc":"xd"})
})

function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send( {"message":msg} )
}


module.exports = router