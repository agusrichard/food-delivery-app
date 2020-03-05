const db = require('../../config/db')

db.query(`
    INSERT INTO user_roles(code, name, description) 
    VALUES('admin', 'Administrator', 'Have the highest authority to access the app');
  `,
  (error, results, fields) => {
    if (error) throw error
    else console.log('success to add admin role')
  }
)