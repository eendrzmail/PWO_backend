const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.checkToken = async function authenticate(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return answer(res, 401, "Brak tokena")

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

        if (err) return answer(res, 403, "Niepoprawny token")

        req.user = user
        next()
    })

}

function answer(res, err, msg) {
    console.log(`Odpowiedź na zapytanie z kodem ${err}`)
    res.status(+err)
    res.send({ "message": msg })
}