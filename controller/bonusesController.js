require('dotenv').config()
const { object, string, number, boolean, date } = require('yup');
const db = require('../db/db')

exports.getOne = async function (req, res, next) {
    let sql = "Select * from BONUSES where (bonus_id = ?)"
    let sqlparams = [req.params.id]

    try {
        const positions = await db.preparedQuery(sql, sqlparams);
        res.send(positions[0] || {})
    }
    catch (err) {
        answer(res, 500, "Poroblem z połączniem do bazy danych")
    }
}

/**
 * {
 *  employee_id
 *  value
 *  bonus_date
 * }
 */
bonusPOST = object({
    employee_id: number("not number").required("employee id required"),
    value: number().required(),
    bonus_date: date().nullable()
})
exports.post = async function (req, res, next) {
    const body = bonusPOST.cast(req.body)

    if (!await bonusPOST.isValid(body)) {
        console.log(await bonusPOST.validate(body))
        return answer(res, 400, "niepoprawne dane")
    }

    sql = "insert into BONUSES values  (NULL, ?, ?, ?)";
    sqlparams = [body.employee_id, body.value, body.bonus_date || null,]

    try {
        let r = await db.preparedQuery(sql, sqlparams)
        res.status(200)
        res.send(body)
    }
    catch (e) {
        return answer(res, 500, "Wystąpił problem z połączeniem z bazą danych")
    }
}

bonusPUT = object({
    bonus_id: number().required(),
    employee_id: number("not number").required("employee id required"),
    value: number().required(),
    bonus_date: date().nullable()
})
exports.put = async function (req, res, next) {
    const body = bonusPUT.cast(req.body)

    if (!await bonusPUT.isValid(body)) {
        return answer(res, 400, "niepoprawne dane")
    }

    sql = "update BONUSES SET `employee_id` = ?, `value` = ?, `bonus_date` = ? WHERE (`bonus_id` = ?)";
    sqlparams = [body.employee_id, body.value, body.bonus_date || null, body.bonus_id]


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
