const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true
})

db.connect(() => console.log('Database Connected'))

module.exports = db