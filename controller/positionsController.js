require('dotenv').config()
const { object, string, number } = require('yup');
const db = require('../db/db')

exports.get = async function (req, res, next) {
    let sql = "Select * from positions"

    try {
        const positions = await db.query(sql);
        res.send(positions)
    }
    catch (err) {
        answer(res, 500, "Poroblem z połączniem do bazy danych")
    }

}

exports.getOne = async function (req, res, next) {
    let sql = "Select * from positions where id=?"
    sqlparams = [req.params.id]

    try {
        const positions = await db.preparedQuery(sql, sqlparams);
        res.send(positions[0] || {})
    }
    catch (err) {
        answer(res, 500, "Poroblem z połączniem do bazy danych")
    }

}

const postSchema = object({
    name: string().required(),
    salary: number().required()
})
exports.post = async function (req, res, next) {
    const body = postSchema.cast(req.body)

    if (!await postSchema.isValid(body)) return answer(res, 400, "niepoprawne dane")

    sql = "insert into positions (`nazwa`, `podstawa`) values  (?, ?)"
    sqlparams = [body.name, body.salary]

    try {
        let r = await db.preparedQuery(sql, sqlparams)
        res.status(200)
        res.send(body)
    }
    catch (e) {
        return answer(res, 500, "Wystąpił problem z połączeniem z bazą danych")
    }
}

const PUTSchema = object({
    id: number().required(),
    name: string().required(),
    salary: number().required()
})
exports.put = async function (req, res, next) {
    const body = PUTSchema.cast(req.body)

    if (!await PUTSchema.isValid(body)) return answer(res, 400, "niepoprawne dane")

    sql = "update positions set `nazwa` = ?, `podstawa` = ? where (id = ?)"
    sqlparams = [body.name, body.salary, body.id]

    try {
        let r = await db.preparedQuery(sql, sqlparams)
        res.status(200)
        res.send(body)
    }
    catch (e) {
        console.log(e);
        return answer(res, 500, "Wystąpił problem z połączeniem z bazą danych")
    }
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send({ "message": msg })
}
