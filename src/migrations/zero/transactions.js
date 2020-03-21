const db = require('../../config/db')

db.query(
  `CREATE TABLE transactions (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT,
      expenses INT,
      success TINYINT DEFAULT 0,
      date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
      date_updated DATETIME ON UPDATE CURRENT_TIMESTAMP
    );`,
  (error, results, fields) => {
    if (error) throw error
    else console.log('transactions table is created successfully')
  }
)