const db = require('../config/db')


const createUser = (name, username, email, password) => {
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
              INSERT INTO users(full_name, username, email, password) 
              VALUES(
                ${db.escape(name)},
                ${db.escape(username)}, 
                ${db.escape(email)}, 
                ${db.escape(password)}
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


const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
        DELETE FROM users
        WHERE id=${db.escape(parseInt(id))};
      `,
      (error, results, fields) => {
        if (error) reject(error)
        else resolve()
      }
    )
  })
}


const addAdminUser = (id, username) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
        UPDATE users
        SET role_id=1
        WHERE id=${db.escape(parseInt(id))} AND username=${db.escape(username)};
      `,
      (error, results, fields) => {
        if (error) reject(error)
        else resolve()
      }
    )
  })
}


module.exports = { createUser, getUserByUsername, deleteUser, addAdminUser }