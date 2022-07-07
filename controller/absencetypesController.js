require('dotenv').config()
const { object, string, number, boolean, date } = require('yup');
const db = require('../db/db')

exports.get = async function (req, res, next) {
    let sql = "Select * from absencetypes"

    try {
        const re = await db.query(sql);
        res.send(re)
    }
    catch (err) {
        answer(res, 500, "Problem z połączniem do bazy danych")
    }
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send({ "message": msg })
}
