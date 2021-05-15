require('dotenv').config()
const jwt = require('jsonwebtoken');
const db = require('../db/db')

//REJSTRACJA
exports.register = async function (req, res, next) {
    //sprawdź czy są wszystkie wymagane pola
    if (!req.body.email || !req.body.imie || !req.body.haslo || !req.body.powtorzhaslo) {
        answer(res, 400, "Niewystarczające dane")
    }
    //sprawdź czy hasła się zgadzają
    else if (req.body.haslo != req.body.powtorzhaslo) {
        answer(res, 400, "Hasla sie nie zgadzaja")
    }
    else {
        //sprawdź poprawność danych
        regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm
        regex_imie = /^[a-zA-Z]{2,50}/gm
        regex_nazwisko = /^[a-zA-Z]{2,100}/gm
        regex_haslo = /^.*(?=.[a-z]{1,})(?=.*[A-Z]{1,}).*/gm

        if (
            req.body.email.match(regex_email) &&
            req.body.imie.match(regex_imie) &&
            req.body.nazwisko ? req.body.nazwisko.match(regex_nazwisko) : true &&
            req.body.haslo.match(regex_haslo) &&
            req.body.haslo.length >= 7
        ) {
            //stworzenie nowego użytkownika
            let sql, param
            if (req.body.nazwisko) {
                sql = "INSERT INTO `agent` (`email`, `imie`, `nazwisko`, `haslo`) VALUES (?, ?, ?, ?)"
                param = [req.body.email, req.body.imie, req.body.nazwisko, req.body.haslo]
            }
            else {
                sql = "INSERT INTO `agent` (`email`, `imie`, `haslo`) VALUES (?, ?, ?)"
                param = [req.body.email, req.body.imie, req.body.haslo]
            }

            db.preparedQuery(sql, param).then(x => {
                answer(res, 201, "Utworzono pomyślnie")
            })
                .catch(e => {
                    answer(res, 400, "Użytkownik o tym mailu już istnieje")
                    console.error("Użytkownik o tym mailu już istnieje")
                    //throw new Error("Użytkownik o tym mailu istnieje")
                })



        }
        else {
            answer(res, 400, "Niepoprawne dane")
        }
    }



}

//LOGOWANIE
exports.login = async function(req, res, next) {

    const { email, haslo } = req.body;

    if (!email || !haslo) 
        answer(res,400,"Brak wszystkich danych")
    else {
    
        let sql = "Select * from agent where email = ? and haslo = ?"
        let param = [email,haslo]

        let user = await db.preparedQuery(sql,param)

        if (user.length==0){
            answer(res,400,"Nieprawidłowe dane logowania")
        }
        else{
            const accesToken = jwt.sign({email:user[0].email}, process.env.TOKEN_SECRET, { expiresIn: 90000 })

            res.send({ accesToken }) 
        }

        
    }
}

function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send( {"message":msg} )
}
