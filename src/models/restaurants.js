const db = require('../config/db')

const createRestaurant = (ownerId, name, location, description) => {
  console.log('In models/restaurants/createRestaurant')
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO restaurants(name, location, description, owner_id)
        VALUES(${db.escape(name)}, ${db.escape(location)}, ${db.escape(description)}, ${db.escape(ownerId)})
      `,
      (error, results, fields) => {
        if (error) reject(error)
        else resolve()
      }
    )
  })
}


const getAllRestaurants = (params) => {
  console.log('placeholder')
}

const getRestaurantById = (id) => {
  console.log('In models/restaurants/getRestaurantById')
  return new Promise((resolve, reject) => {
    db.query(
      `
        SELECT *
        FROM restaurants
        WHERE id=${parseInt(id)};
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


module.exports = { createRestaurant, getAllRestaurants, getRestaurantById }