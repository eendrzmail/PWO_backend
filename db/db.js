const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

function request(sql){
    return new Promise((resolve,reject) => {
        pool.query(sql,(err,res) => {
            if (err)
                reject(err);
            resolve(res);
        })
    })
}

function preparedRequest(sql,params){
    return new Promise((resolve,reject) => {
        pool.query(sql,params,(err,res) => {
            if (err)
                reject(err);
            resolve(res);
        })
    })
}

module.exports.pool= pool;
module.exports.query= request;
module.exports.preparedQuery= preparedRequest;
