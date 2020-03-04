const db = require('../../config/db')

db.query(
  `
    ALTER TABLE foods
    ADD FOREIGN KEY(id_restaurant)
    REFERENCES restaurants(id)
    ON DELETE CASCADE;
  `,
  (error, results, fields) => {
    if (error) throw error
    else console.log('Altering foods table is success')
  }
)