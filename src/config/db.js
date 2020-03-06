const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true
})

db.connect()

module.exports = db