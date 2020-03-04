const db = require('../../config/db')

db.query(
  `
    ALTER TABLE restaurants
    ADD FOREIGN KEY(owner_id)
    REFERENCES users(id)
    ON DELETE SET NULL;
  `,
  (error, results, fields) => {
    if (error) throw error
    else console.log('Altering restaurants table is success')
  }
)