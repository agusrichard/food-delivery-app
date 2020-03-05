const db = require('../config/db')

const createRestaurant = (ownerId, name, location, description, date) => {
  console.log('In models/restaurants/createRestaurant')
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO restaurants(name, location, description, owner_id, date_created, date_updated)
        VALUES(
          ${db.escape(name)}, 
          ${db.escape(location)}, 
          ${db.escape(description)}, 
          ${db.escape(ownerId)},
          ${db.escape(date)},
          ${db.escape(date)}
        );
      `,
      (error, results, fields) => {
        if (error) reject(error)
        else resolve()
      }
    )
  })
}


const getAllRestaurants = (params) => {
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
      from restaurants`,
      (error, results, fields) => {
        if (error) reject(error)
        else {
          const total = results[0].total
          db.query(
            `SELECT *
            FROM restaurants
            ${conditions};`,
            (error, results, fields) => {
              if (error) reject(error)
              resolve({ results, total })
            }
          )
        }
      }
    )
  })
}

const getRestaurantById = (id) => {
  console.log('In models/restaurants/getRestaurantById')
  return new Promise((resolve, reject) => {
    db.query(
      `
        SELECT *
        FROM restaurants
        WHERE id=${db.escape(parseInt(id))};
      `,
      (error, results, fields) => {
        if (error) reject(error)
        if (results.length !== 0) {
          resolve(results[0])
        } else {
          resolve(false)
        } 
      }
    )
  })
}


const updateRestaurant = (id, data) => {
  console.log('In models/restaurants/updateRestaurant')
  return new Promise((resolve, reject) => {
    db.query(
      `
        UPDATE restaurants
        SET name=${db.escape(data.name)}, location=${db.escape(data.location)}, description=${db.escape(data.description)}, date_updated=${db.escape(data.date)}
        WHERE id=${db.escape(id)};
      `,
      (error, results, fields) => {
        if (error) reject(error)
        else resolve()
      }
    )
  })
}

const deleteRestaurant = (id) => {
  console.log('In models/restaurants/deleteRestaurant')
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM restaurants
       WHERE id=${db.escape(parseInt(id))};`,
       (error, results, fields) => {
         if (error) reject(error)
         resolve()
       }
    )
  })
}


module.exports = { 
  createRestaurant, 
  getAllRestaurants, 
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
}