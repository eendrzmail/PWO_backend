
const express= require('express');
const router = express.Router();

db = require('../db/db');

router.get('/test', async (req,res) => {

    let x = await  db.query("Select * from samochod")
    let y = await  db.preparedQuery("Select * from samochod where marka = ?",'Opel')

    //console.log(x)
    //console.log(y)


    res.send({"abc":"xd"})
})


module.exports = router