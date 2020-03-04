const db = require('../../config/db')

db.query(
  `CREATE TABLE restaurants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(70),
    logo TEXT,
    location TEXT,
    description TEXT,
    owner_id INT,
    date_created DATETIME,
    date_updated DATETIME
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('restaurants table is created successfully')
  }
)