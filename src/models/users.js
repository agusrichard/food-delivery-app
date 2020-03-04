const db = require('../config/db')


const createUser = (name, username, email, password, date_created) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
        SELECT COUNT(*) as total
        FROM users
        WHERE username=${db.escape(username)}
        LIMIT 1;
      `,
      (error, results, fields) => {
        if (!error) {
          const { total } = results[0]
          if (total !== 0) {
            resolve(false)
          } else {
            db.query(`
            INSERT INTO users(username, email, password, date_created, date_updated) 
            VALUES(
              ${db.escape(username)}, 
              ${db.escape(email)}, 
              ${db.escape(password)}, 
              ${db.escape(date_created)}, 
              ${db.escape(date_created)}
            );
            `,
            (error, results, fields) => {
              if (error) reject(error)
              else resolve(true)
            })
          }
        } else reject(error)
      }
    )
  })
}


const getUserByUsername = (username) => {
  console.log('In models/users, username: ' + username)
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
       FROM users
       WHERE username=${db.escape(username)};`,
      (error, results, fields) => {
        if (error) reject(error)
        console.log('In getUserByUsername, results: ' + results)
        resolve(results[0])
      }
    )
  })
}


module.exports = { createUser, getUserByUsername }