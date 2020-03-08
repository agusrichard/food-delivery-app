const db = require('../config/db')


const createUser = (data) => {

  const selectQuery = `
    SELECT COUNT(*) as total
    FROM users
    WHERE username=${db.escape(data.username)}
    LIMIT 1;
  `

  const insertQuery = `
    INSERT INTO users(full_name, username, email, password, verification_code) 
    VALUES(
      ${db.escape(data.name)},
      ${db.escape(data.username)}, 
      ${db.escape(data.email)}, 
      ${db.escape(data.hashedPassword)},
      ${db.escape(data.token)}
    );
  `

  return new Promise((resolve, reject) => {
    db.query(selectQuery, (error, results, fields) => {
      if (!error) {
        const { total } = results[0]
        if (total !== 0) {
          resolve(false)
        } else {
          db.query(insertQuery, (error, results, fields) => {
            if (error) reject(error)
            else resolve(true)
          })
        }
      } else reject(error)
    })
  })
}


const getUserByUsername = (username) => {
  console.log('In models/users, username: ' + username)

  const query = `
    SELECT *
    FROM users
    WHERE username=${db.escape(username)};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      console.log('In getUserByUsername, results: ' + results)
      if (results) resolve(results[0])
      else resolve(false)
    })
  })
}


const getUserById = (id) => {
  console.log('In models/users, id: ' + id)

  const query = `
    SELECT *
    FROM users
    WHERE id=${db.escape(id)};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      console.log('In getUserId, results: ' + results)
      if (results) resolve(results[0])
      else resolve(false)
    })
  })
}


const changeProfile = (userId, data) => {
  console.log('Inside models/users/changeProfile')
  console.log(data)

  const query = `
    UPDATE users
    SET 
      email=${db.escape(data.email)}, 
      full_name=${db.escape(data.fullName)}, 
      profile_picture=${db.escape(data.profilePicture)}
    WHERE id=${db.escape(userId)};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      else resolve()
    })
  })
}


const deleteUser = (id) => {
  console.log('Inside models/usres/deleteUser')
  const query = `
    DELETE FROM users
    WHERE id=${db.escape(parseInt(id))};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      if (error) reject(error)
      else resolve()
    })
  })
}


const addAdminUser = (id, username) => {

  const query = `
    UPDATE users
    SET role_id=1
    WHERE id=${db.escape(parseInt(id))} AND username=${db.escape(username)};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

const updateBalance = (username, balance) => {

  const query = `
    UPDATE users
    SET balance=${db.escape(parseInt(balance))}
    WHERE username=${db.escape(username)}
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      else resolve()
    })
  })
}


const verifyUser = (username) => {
  console.log('Inside models/users/verifyUser')
  const query = `
    UPDATE users
    SET is_verified=1, verification_code=NULL
    WHERE username=${db.escape(username)};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      if (error) reject(error)
      else resolve()
    })
  })
}


const changePassword = (username, newPassword) => {
  console.log('Inside models/users/verifyUser')
  const query = `
    UPDATE users
    SET password=${db.escape(newPassword)}
    WHERE username=${db.escape(username)};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      if (error) reject(error)
      else resolve()
    })
  })
}

const getAllUsers = (params) => {
  const { perPage, currentPage, search, sort } = params

  // Query conditions
  const conditions = `
    ${search && `WHERE ${search.map(v => `${v.key} LIKE '%${v.value}%'`).join(' AND ')}`}
    ORDER BY ${sort.key} ${parseInt(sort.value) === 0 ? 'ASC' : 'DESC'}
    LIMIT ${perPage}
    OFFSET ${(currentPage - 1) * perPage}
  `

  console.log(conditions)

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) AS total
      from users`,
      (error, results, fields) => {
        const total = results[0].total
        db.query(
          `SELECT *
           FROM users
           ${conditions};`,
           (error, results, fields) => {
             if (error) reject(error)
             resolve({ results, total })
           }
        )
      }
    )
  })
}


module.exports = { 
  createUser, 
  getUserByUsername,
  getUserById, 
  deleteUser, 
  addAdminUser, 
  changeProfile,
  updateBalance,
  verifyUser,
  changePassword,
  getAllUsers
}
