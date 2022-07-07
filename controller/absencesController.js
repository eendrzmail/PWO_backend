require('dotenv').config()
const { object, string, number, boolean, date } = require('yup');
const db = require('../db/db')

exports.get = async function (req, res, next) {
    let sql = "Select * from absences left join employees on absences.employee_id = employees.id"

    try {
        const re = await db.query(sql);
        res.send(re)
    }
    catch (err) {
        answer(res, 500, "Problem z połączniem do bazy danych")
    }
}

/**
 * {
 *  employee_id
 *  absence_type
 *  absence_from
 *  absence_to
 * }
 */
absencePOST = object({
    employee_id: number("not number").required("employee id required"),
    absence_type: number("not number").required("type required"),
    absence_from: date().nullable(),
    absence_to: date().nullable()
})
exports.post = async function (req, res, next) {
    const body = absencePOST.cast(req.body)

    if (!await absencePOST.isValid(body)) {
        console.log(await absencePOST.validate(body))
        return answer(res, 400, "niepoprawne dane")
    }

    sql = "insert into absences values  (NULL, ?, ?, ?, ?)";
    sqlparams = [body.employee_id, body.absence_type, body.absence_from || null, body.absence_to || null]

    try {
        let r = await db.preparedQuery(sql, sqlparams)
        res.status(200)
        res.send(body)
    }
    catch (e) {
        return answer(res, 500, "Wystąpił problem z połączeniem z bazą danych")
    }
}

absencePUT = object({
    absence_id: number().required(),
    employee_id: number("not number").required("employee id required"),
    absence_type: number("not number").required("type required"),
    absence_from: date().nullable(),
    absence_to: date().nullable()
})
exports.put = async function (req, res, next) {
    const body = absencePUT.cast(req.body)

    if (!await absencePUT.isValid(body)) {
        return answer(res, 400, "niepoprawne dane")
    }

    sql = "update absences SET `employee_id` = ?, `absence_type` = ?, `absence_from` = ?, `absence_to` = ? WHERE (`absence_id` = ?)";
    sqlparams = [body.employee_id, body.absence_type, body.absence_from || null, body.absence_to || null, body.absence_id]

    try {
        let r = await db.preparedQuery(sql, sqlparams)
        res.status(200)
        res.send(body)
    }
    catch (e) {
        if (e.code == 'ER_NO_REFERENCED_ROW_2')
        return answer(res, 400, "Nieprawidłowe połączenie")
    return answer(res, 500, "Wystąpił problem z połączeniem z bazą danych")
    }
}


function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send({ "message": msg })
}
