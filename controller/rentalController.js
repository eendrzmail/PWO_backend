require('dotenv').config()
const db = require('../db/db')

exports.rentCar = async function (req, res, next) {
    res.send("asd")
}

exports.getHistory = async function (req, res, next) {

    const { page } = req.query;

    let sql = "Select * from wypozyczenia ORDER BY id desc LIMIT 10 OFFSET ?"
    let sql2 = "Select count(*) as suma from wypozyczenia"

    let pageParam = isNaN(+page) || +page <= 0 ? 1 : +page
    pageParam = --pageParam * 10


    try {
        let r = await db.preparedQuery(sql, pageParam)
        let r2 = await db.query(sql2)

        let allPages = (Math.floor((+r2[0].suma / 10) + 1))


        let ob = {
            "strona": (pageParam / 10) + 1,
            "wszystkich": allPages,
            "wypozyczenia": r
        }

        res.status(200)
        return res.send(ob)
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