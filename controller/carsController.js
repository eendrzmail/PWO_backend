require('dotenv').config()
const db = require('../db/db')

exports.addCar = async function(req,res,next) {

    const { marka, model, numer_rejestracyjny } = req.body;
    const user = req.user

    if (!marka || !model || !numer_rejestracyjny)
        return answer(res,400,"Niepełne dane")

    const marka_regex = /^.{2,100}$/
    const model_regex = /^.{2,100}$/
    const nr_regex = /^.{4,10}$/

    let match = !!marka.match(marka_regex) && !!model.match(model_regex) && !!numer_rejestracyjny.match(nr_regex)
    
    if (!match) {
        let err = {}
        err.message = "Dane nieprawidłowe"
        err.marka = !!marka.match(marka_regex) 
        err.model = !!model.match(model_regex)
        err.numer_rejestracyjny =  !!numer_rejestracyjny.match(nr_regex)
        res.status(400)
        return res.send(err)
        //return answer(res, 400, "Dane niepoprawne")
    }
        


    let sql = "Insert into samochody (`marka`, `model`, `numer_rejestracyjny`, `wlasciciel`) values (?, ?, ?, ?)"
    let params = [marka,model,numer_rejestracyjny,user.email]

    try {
        let r = await db.preparedQuery(sql,params)
        res.status(201)
        res.send({"message":"Utworzono pomyślnie"})
    }
    catch(e){

        let msg =""
        if (e.code == "ER_DUP_ENTRY")
            return answer(res, 400, "Samochód o takim nr rejestracyjnym już istnieje")
        else
            return answer(res, 500, "Błąd podczas połączenia z bazą danych")

        
    }
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send( {"message":msg} )
}