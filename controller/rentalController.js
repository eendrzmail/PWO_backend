require('dotenv').config()
const db = require('../db/db')

exports.rentCar = async function(req,res,next) {

    const { start, koniec, samochod } = req.body;
    const user = req.user

    if (!start || !koniec || !samochod)
        return answer(res,400,"Brak wymaganych danych")

    const data_regex = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/gim
    const samochod_regex = /^.{4,10}$/

    let match = !!start.match(data_regex) && !!koniec.match(data_regex) && !!samochod.match(samochod_regex)

    //sprawdzanie poprawności danych
    if (!match) {
        let err = {}
        err.message = "Nieprawidłowe dane"
        err.start =!!start.match(data_regex) 
        err.koniec = !!koniec.match(data_regex) 
        err.samochod = !!samochod.match(samochod_regex)
        res.status(400)
        return res.send(err)
        //return answer(res,400,"Niepoprawne dane")
    }
        

    let date_start = new Date(start)
    let date_end = new Date(koniec)

    //sprawdzanie prawidłowości dat
    if (!(date_start<date_end))
        return answer(res,400,"Data startu nie może być większa niż data końca")

    // sprawdź czy samochód należy to tego użytkownika
    sqlcar = "Select * from samochody where numer_rejestracyjny = ? AND wlasciciel = ?"
    sqlcarparams = [samochod,user.email]

    try {
        let car = await db.preparedQuery(sqlcar,sqlcarparams)
        if (car.length==0){
            return answer(res,400,"Ten samochód nie należy zalogowanego użytkownika lub nie istnieje w bazie danych")
        }
    }
    catch(e){
        return answer(res,500,"Problem z połączeniem z bazą danych")
    }


    //sprawdź czy samochód jest wolny w tym czasie
    //wybieram wypożyczenia samochodu w których data końca jest większa niż start i data startowa jest mniejsza niż koniec (te które miałyby kolidować)  
    let sql1 = "Select * from wypozyczenia where samochod = ? AND koniec > ? AND start < koniec AND start < ?"
    let pageParams1 = [samochod, start, koniec]

    let errors
    try {
        errors = await db.preparedQuery(sql1,pageParams1)
    }
    catch (e) {
        return answer(res,500,"Problem z połączeniem z bazą danych")
    }

    if (errors.length > 0 ) {
        return answer(res,400,"Samochód jest w tym czasie wypożyczony")
    }

    //jeśli nic nie koliduje, to wypożycz
    let sql = "Insert into wypozyczenia (`start`, `koniec`, `samochod`, `utworzono`, `kto_utworzyl`) values (?, ?, ?, NOW(), ?)"
    let pageParams = [start,koniec,samochod,user.email]

    try {
        let r = await db.preparedQuery(sql,pageParams)
        return answer(res,201,`Pomyślnie utworzono wypożyczenie dla ${user.email} w termienie ${start} - ${koniec}`)
    }
    catch (e) {
        if (e.code == "ER_NO_REFERENCED_ROW_2") {
            return answer(res,400,"Taki samochód nie istnieje")
        }
        return answer(res,500,"Wystąpił problem z połączeniem z bazą danych")
    } 

}

exports.getHistory = async function(req,res,next) {

    const { page } = req.query;

    let sql = "Select * from wypozyczenia ORDER BY id desc LIMIT 10 OFFSET ?"
    let sql2 = "Select count(*) as suma from wypozyczenia"

    let pageParam = isNaN(+page) || +page<=0 ? 1 : +page
    pageParam = --pageParam * 10


    try {
        let r = await db.preparedQuery(sql,pageParam)
        let r2 = await db.query(sql2)

        let allPages = (Math.floor( (+r2[0].suma / 10) +1 ))


        let ob = {
            "strona":(pageParam / 10) + 1,
            "wszystkich":allPages, 
            "wypozyczenia":r
        }

        res.status(200)
        return res.send(ob)
    }
    catch(e) {
        return answer(res,500,"Wystąpił problem z połączeniem z bazą danych")
    }
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send( {"message":msg} )
}