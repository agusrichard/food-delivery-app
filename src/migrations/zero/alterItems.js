const db = require('../../config/db')

db.query(
  `
    ALTER TABLE items
    ADD FOREIGN KEY(restaurant_id)
    REFERENCES restaurants(id)
    ON DELETE CASCADE;
  `,
  (error, results, fields) => {
    if (error) throw error
    else console.log('Altering items table is success')
  }
)