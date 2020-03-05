const db = require('../../config/db')

db.query(
  `
    ALTER TABLE users
    ADD FOREIGN KEY(role_id)
    REFERENCES user_roles(id)
    ON DELETE SET NULL;
  `,
  (error, results, fields) => {
    if (error) throw error
    else console.log('Altering user_roles table is success')
  }
)