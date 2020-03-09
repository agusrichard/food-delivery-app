const db = require('../../config/db')

db.query(
  `CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT,
    username VARCHAR(40),
    email VARCHAR(40),
    password VARCHAR(60),
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME ON UPDATE CURRENT_TIMESTAMP,
    full_name VARCHAR(70),
    profile_picture TEXT,
    balance INT DEFAULT 0,
    is_verified TINYINT DEFAULT 0,
    verification_code TEXT
  );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('users table is created successfully')
  }
)