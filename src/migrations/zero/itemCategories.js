const db = require('../../config/db')

db.query(
  `CREATE TABLE item_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40)
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('item_categories table is created successfully')
  }
)