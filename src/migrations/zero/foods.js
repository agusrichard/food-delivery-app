const db = require('../../config/db')

db.query(
  `CREATE TABLE foods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_restaurant INT,
    name VARCHAR(40),
    price INT,
    images TEXT,
    description TEXT,
    date_created DATETIME,
    date_updated DATETIME
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('foods table is created successfully')
  }
)