const db = require('../../config/db')

db.query(
  `CREATE TABLE item_carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    item_id INT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('item_carts table is created successfully')
  }
)