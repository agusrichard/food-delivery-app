const db = require('../../config/db')

db.query(
  `CREATE TABLE foods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    price INT,
    image VARCHAR(60),
    description TEXT,
    date_created DATETIME,
    date_updated DATETIME
  )`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('foods tables created successfully')
  }
)