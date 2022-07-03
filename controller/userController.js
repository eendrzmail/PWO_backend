require('dotenv').config()
const jwt = require('jsonwebtoken');
const db = require('../db/db')
const crypto = require('crypto')
/*
{
    email
    password
    confirmPassword
}
*/
exports.register = async function (req, res, next) {
    if (!req.body.email || !req.body.imie || !req.body.password || !req.body.confirmPassword) {
        answer(res, 400, "Niewystarczające dane")
    }
    else if (req.body.password != req.body.confirmPassword) {
        answer(res, 400, "Hasla sie nie zgadzaja")
    }
    else {
        //sprawdź poprawność danych
        regex_email = /^[a-z]{1,}@[a-z]{1,}.[a-z]{1,}$/gim
        regex_imie = /^[a-z]{2,50}$/gim
        regex_nazwisko = /^[a-z]{2,100}$/gim
        regex_password = /^.*(?=.[a-z]{1,})(?=.*[A-Z]{1,}).*$/gm

        if (
            !!req.body.email.match(regex_email) &&
                !!req.body.imie.match(regex_imie) &&
                !!req.body.nazwisko ? req.body.nazwisko.match(regex_nazwisko) : true &&
                !!req.body.password.match(regex_password) &&
            req.body.password.length >= 7
        ) {
            //stworzenie nowego użytkownika
            let sql, param

            let password_hash = crypto.createHash('sha256').update(req.body.password).digest('hex');

            if (req.body.nazwisko) {
                sql = "INSERT INTO `users` (`email`, `imie`, `nazwisko`, `password`) VALUES (?, ?, ?, ?)"
                param = [req.body.email, req.body.imie, req.body.nazwisko, password_hash]
            }
            else {
                sql = "INSERT INTO `users` (`email`, `imie`, `password`) VALUES (?, ?, ?)"
                param = [req.body.email, req.body.imie, password_hash]
            }

            db.preparedQuery(sql, param).then(x => {
                answer(res, 201, "Utworzono pomyślnie")
            })
                .catch(e => {
                    console.error("Błąd przy dodawaniu użytkownika")

                    let msg = "Nieznany błąd"
                    if (e.code == "ER_DUP_ENTRY")
                        return answer(res, 400, "Użytkownik o takim mailu już istnieje")
                    else
                        return answer(res, 500, "Wystąpił błąd z połączeniem z bazą danych")




                    //throw new Error("Użytkownik o tym mailu istnieje")
                })



        }
        else {
            let errstr = {}
            errstr.message = "Niepoprawne dane"
            errstr.email = !!req.body.email.match(regex_email)
            errstr.imie = !!req.body.imie.match(regex_imie)
            errstr.nazwisko = req.body.nazwisko ? !!req.body.nazwisko.match(regex_nazwisko) : true
            errstr.password = !!req.body.password.match(regex_password)
            errstr.dlugosc_hasla = req.body.password.length >= 7
            res.status(400)
            return res.send(errstr)
            //answer(res, 400, "Niepoprawne dane: "+errstr)
        }
    }



}

//LOGOWANIE
/*
{
    email
    password
}
*/
exports.login = async function (req, res, next) {

    const { email, password } = req.body;

    if (!email || !password)
        answer(res, 400, "Brak wszystkich danych")
    else {
        let password_hash = crypto.createHash('sha256').update(req.body.password).digest('hex');

        let sql = "Select * from users where email = ? and password = ?"
        let param = [email, password_hash]

        try {
            var user = await db.preparedQuery(sql, param)
        }
        catch (e) {
            console.log(e)
            return answer(req, 500, "Coś nie tak z połączeniem z bazą danych")
        }


        if (user.length == 0 || !user) {
            answer(res, 400, "Nieprawidłowe dane logowania")
        }
        else {
            const accesToken = jwt.sign({ email: user[0].email }, process.env.TOKEN_SECRET, { expiresIn: 90000 })

            res.send({ accesToken })
        }


    }
}

function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send({ "message": msg })
}
