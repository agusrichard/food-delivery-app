const db = require('../../config/db')

db.query(
  `CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    username VARCHAR(40),
    email VARCHAR(40),
    password VARCHAR(60),
    date_created DATETIME,
    date_updated DATETIME
  )`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('users table created successfully')
  }
)