const db = require('../../config/db')

db.query(
  `CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT,
    category_id INT,
    name VARCHAR(40),
    price INT,
    images TEXT,
    description TEXT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME ON UPDATE CURRENT_TIMESTAMP
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('items table is created successfully')
  }
)