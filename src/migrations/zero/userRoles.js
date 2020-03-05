const db = require('../../config/db')


db.query(
  `CREATE TABLE user_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(40),
    name VARCHAR(60),
    description TEXT
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('user_roles table is created successfully')
  }
)