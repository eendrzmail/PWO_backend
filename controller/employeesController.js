require('dotenv').config()
const db = require('../db/db')

exports.get = async function (req, res, next) {
    let sql = "Select * from employees as e left join positions as p on e.id_stanowiska = p.id"

    try {
        const employees = await db.query(sql);
        res.send(employees)
    }
    catch (err) {
        answer(res, 500, "Poroblem z połączniem do bazy danych")
    }
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send({ "message": msg })
}
