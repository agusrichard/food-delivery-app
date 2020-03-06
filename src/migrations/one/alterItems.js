const db = require('../../config/db')

db.query(
  `
    ALTER TABLE items
    ADD category_id INT;

    ALTER TABLE items
    ADD FOREIGN KEY(category_id)
    REFERENCES item_categories(id)
    ON DELETE SET NULL;
  `,
  (error, results, fields) => {
    if (error) throw error
    else console.log('Altering items table is success')
  }
)