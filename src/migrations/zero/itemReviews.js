const db = require('../../config/db')

db.query(
  `CREATE TABLE item_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    item_id INT,
    rating DECIMAL(3,2),
    review TEXT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(item_id) REFERENCES items(id) ON DELETE CASCADE
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('item_reviews table is created successfully')
  }
)