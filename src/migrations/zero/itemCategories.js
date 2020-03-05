const db = require('../../config/db')

db.query(
  `CREATE TABLE item_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT,
    name VARCHAR(40),
    FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('item_categories table is created successfully')
  }
)