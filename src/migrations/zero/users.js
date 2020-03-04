const db = require('../../config/db')

db.query(
  `CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(40),
    email VARCHAR(40),
    password VARCHAR(60),
    date_created DATETIME,
    date_updated DATETIME,
    full_name VARCHAR(70),
    profile_picture VARCHAR(70)
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('users table is created successfully')
  }
)