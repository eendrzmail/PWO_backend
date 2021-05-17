require('dotenv').config()
const jwt = require('jsonwebtoken');
const db = require('../db/db')
const crypto = require('crypto')

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
        regex_email = /^[a-z]{1,}@[a-z]{1,}.[a-z]{1,}$/gim
        regex_imie = /^[a-z]{2,50}$/gim
        regex_nazwisko = /^[a-z]{2,100}$/gim
        regex_haslo = /^.*(?=.[a-z]{1,})(?=.*[A-Z]{1,}).*$/gm

        if (
            !! req.body.email.match(regex_email) &&
            !! req.body.imie.match(regex_imie) &&
            !! req.body.nazwisko ? req.body.nazwisko.match(regex_nazwisko) : true &&
            !! req.body.haslo.match(regex_haslo) &&
            !! req.body.haslo.length >= 7
        ) {
            //stworzenie nowego użytkownika
            let sql, param

            let haslo_hash=crypto.createHash('sha256').update(req.body.haslo).digest('hex');

            if (req.body.nazwisko) {
                sql = "INSERT INTO `agenci` (`email`, `imie`, `nazwisko`, `haslo`) VALUES (?, ?, ?, ?)"
                param = [req.body.email, req.body.imie, req.body.nazwisko, haslo_hash]
            }
            else {
                sql = "INSERT INTO `agenci` (`email`, `imie`, `haslo`) VALUES (?, ?, ?)"
                param = [req.body.email, req.body.imie, haslo_hash]
            }

            db.preparedQuery(sql, param).then(x => {
                answer(res, 201, "Utworzono pomyślnie")
            })
            .catch(e => {
                console.error("Błąd przy dodawaniu użytkownika")

                let msg ="Nieznany błąd"
                if (e.code == "ER_DUP_ENTRY")
                    return answer(res, 400, "Użytkownik o takim mailu już istnieje")
                else 
                    return answer(res, 500, "Wystąpił błąd z połączeniem z bazą danych")

                

                
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
        let haslo_hash=crypto.createHash('sha256').update(req.body.haslo).digest('hex');
    
        let sql = "Select * from agenci where email = ? and haslo = ?"
        let param = [email,haslo_hash]

        try{
            var user = await db.preparedQuery(sql,param)
        }
        catch(e) {
            console.log(e)
            return answer(req,500,"Coś nie tak z połączeniem z bazą danych")
        }
        

        if (user.length==0 || !user){
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
