require('dotenv').config()
const { object, string, number, boolean } = require('yup');
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

const POSTSchema = object({
    imie: string().required(),
    nazwisko: string().required(),
    msc_pracy: number().required(),
    id_stanowiska: number().required()
})
exports.post = async function (req, res, next) {
    const body = POSTSchema.cast(req.body)

    if (!await POSTSchema.isValid(body)) answer(res, 400, "niepoprawne dane")

    console.log(body)
    sql = "insert into employees " +
        "(`imie`, `nazwisko`, `msc_pracy`, `status`,  `id_stanowiska`) values " +
        "(?, ?, ?, 1, ?)"
    sqlparams = [body.imie, body.nazwisko, body.msc_pracy, body.id_stanowiska]

    try {
        let r = await db.preparedQuery(sql, sqlparams)
        res.status(200)
        res.send(body)
    }
    catch (e) {
        if (e.code == 'ER_NO_REFERENCED_ROW_2')
            return answer(res, 500, "Brak takiego stanowiska")
        return answer(res, 500, "Wystąpił problem z połączeniem z bazą danych")
    }
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send({ "message": msg })
}
