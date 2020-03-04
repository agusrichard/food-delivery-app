const db = require('../../config/db')

db.query(
  `CREATE TABLE food_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_food INT,
    name VARCHAR(40),
    FOREIGN KEY(id_food) REFERENCES foods(id) ON DELETE CASCADE
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('food_categories table is created successfully')
  }
)