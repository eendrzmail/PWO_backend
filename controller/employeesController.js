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

exports.getOne = async function (req, res, next) {
    let sql = "Select * from employees as e left join positions as p on e.id_stanowiska = p.id where e.id=?"
    sqlparams = [req.params.id]

    try {
        const positions = await db.preparedQuery(sql, sqlparams);
        res.send(positions[0] || {})
    }
    catch (err) {
        answer(res, 500, "Poroblem z połączniem do bazy danych")
    }
}

const POSTSchema = object({
    imie: string().required(),
    nazwisko: string().required(),
    id_stanowiska: number().required()
})
exports.post = async function (req, res, next) {
    const body = POSTSchema.cast(req.body)

    if (!await POSTSchema.isValid(body)) return answer(res, 400, "niepoprawne dane")

    console.log(body)
    sql = "insert into employees " +
        "(`imie`, `nazwisko`, `data_rozpoczecia`, `status`,  `id_stanowiska`) values " +
        "(?, ?, NOW(), 1, ?)"
    sqlparams = [body.imie, body.nazwisko, body.id_stanowiska]

    try {
        let r = await db.preparedQuery(sql, sqlparams)
        res.status(200)
        res.send(body)
    }
    catch (e) {
        console.log(e);
        if (e.code == 'ER_NO_REFERENCED_ROW_2')
            return answer(res, 500, "Brak takiego stanowiska")
        return answer(res, 500, "Wystąpił problem z połączeniem z bazą danych")
    }
}

const PUTSchema = object({
    id: number().required(),
    imie: string().required(),
    nazwisko: string().required(),
    data_rozpoczecia: number().required(),
    status: boolean().required(),
    id_stanowiska: number().required()
})
exports.put = async function (req, res, next) {
    const body = PUTSchema.cast(req.body)

    if (!await PUTSchema.isValid(body)) return answer(res, 400, "niepoprawne dane")

    sql = "update employees set `imie` = ?, `nazwisko` = ?, `data_rozpoczecia` = ?, `id_stanowiska` = ? ,`status` = ? where (id = ?)"

    sqlparams = [body.imie, body.nazwisko, body.data_rozpoczecia, body.id_stanowiska, body.status, body.id]

    try {
        let r = await db.preparedQuery(sql, sqlparams)
        res.status(200)
        res.send(body)
    }
    catch (e) {
        return answer(res, 500, "Wystąpił problem z połączeniem z bazą danych")
    }
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send({ "message": msg })
}
