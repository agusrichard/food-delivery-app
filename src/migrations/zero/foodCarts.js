const db = require('../../config/db')

db.query(
  `CREATE TABLE food_carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_food INT,
    date_created DATETIME,
    date_updated DATETIME,
    FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(id_food) REFERENCES foods(id) ON DELETE CASCADE
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('food_carts table is created successfully')
  }
)