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
    if (!match)
        return answer(res,400,"Niepoprawne dane")

    let date_start = new Date(start)
    let date_end = new Date(koniec)

    //sprawdzanie prawidłowości dat
    if (!(date_start<date_end))
        return answer(res,400,"Data startu nie może być większa niż data końca")

    //sprawdź czy samochód jest wolny w tym czasie
    //wybieram wypożyczenia samochodu w których data końca jest większa niż start i data startowa jest mniejsza niż koniec (te które miałyby kolidować)  
    let sql1 = "Select * from wypozyczenia where samochod = ? AND koniec > ? AND start < koniec AND start < ?"
    let params1 = [samochod, start, koniec]

    let obstacles
    try {
        obstacles = await db.preparedQuery(sql1,params1)
    }
    catch (e) {
        return answer(res,500,"Problem z połączeniem z bazą danych")
    }

    if (obstacles.length > 0 ) {
        return answer(res,400,"Samochów jest w tym czasie wypożyczony")
    }

    //jeśli nic nie koliduje, to wypożycz
    let sql = "Insert into wypozyczenia (`start`, `koniec`, `samochod`, `utworzono`, `kto_utworzyl`) values (?, ?, ?, NOW(), ?)"
    let params = [start,koniec,samochod,user.email]

    try {
        let r = await db.preparedQuery(sql,params)
        return answer(res,201,`Pomyślnie utworzono wypożyczenie dla ${user.email} w termienie ${start} - ${koniec}`)
    }
    catch (e) {
        return answer(res,500,"Wystąpił problem z połączeniem z bazą danych")
    } 

}

exports.getHistory = async function(req,res,next) {
    
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send( {"message":msg} )
}