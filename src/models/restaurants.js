const db = require('../config/db')
const { paginationParams } = require('../utilities/pagination')


const createRestaurant = (ownerId, data) => {
  const query = `
    INSERT INTO restaurants(owner_id, name, location, description, logo)
    VALUES(
      ${db.escape(ownerId)},
      ${db.escape(data.name)}, 
      ${db.escape(data.location)}, 
      ${db.escape(data.description)}, 
      ${db.escape(data.logo)}
    );
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
        if (error) reject(error)
        else resolve()
    })
  })
}


const getAllRestaurants = (req) => {
  const { conditions, paginate } = paginationParams(req)

  const totalQuery = `
    SELECT COUNT(*) AS total
    from restaurants
    ${conditions}
  `

  const paginateQuery = `
    SELECT *
    FROM restaurants
    ${conditions}
    ${paginate};
  `

  return new Promise((resolve, reject) => {
    db.query(totalQuery, (error, results, fields) => {
      const total = results[0].total
      db.query(paginateQuery, (error, results, fields) => {
        if (error) reject(error)
          resolve({ results, total })
      })
    })
  })
}

const getRestaurantById = (id) => {

  const query = `
    SELECT *
    FROM restaurants
    WHERE id=${db.escape(parseInt(id))};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
        if (error) reject(error)
        if (results.length !== 0) {
          resolve(results[0])
        } else {
          resolve(false)
      } 
    })
  })
}


const updateRestaurant = (id, data) => {

  const query = `
    UPDATE restaurants
    SET 
      name=${db.escape(data.name)}, 
      location=${db.escape(data.location)},
      logo=${db.escape(data.logo)},
      description=${db.escape(data.description)}, 
      date_updated=${db.escape(data.date)}
    WHERE id=${db.escape(id)};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
        console.log(error)
        if (error) reject(error)
        else resolve()
    })
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
    })
  })
}


const getItemsByRestaurantId = (restaurantId) => {
  console.log('Inside models/restaurants/getItemsByRestaurantId')
  const { conditions, paginate } = paginationParams(req)

  const totalQuery = `
    SELECT COUNT(*) AS total
    FROM restaurants
    WHERE restaurant_id=${db.escape(restaurantId)}
    ${conditions};
  `

  const paginateQuery = `
    SELECT *
    FROM restaurants
    ${conditions}
    ${paginate};
  `

  return new Promise((resolve, reject) => {
    db.query(totalQuery, (error, results, fields) => {
      const total = results[0].total
      db.query(paginateQuery, (error, results, fields) => {
        if (error) reject(error)
        resolve({ results, total })
      })
    })
  })
}


// const getAllRestaurants = (req) => {
//   const { conditions, paginate } = paginationParams(req)

//   const totalQuery = `
//     SELECT COUNT(*) AS total
//     from restaurants
//     ${conditions}
//   `

//   const paginateQuery = `
//     SELECT *
//     FROM restaurants
//     ${conditions}
//     ${paginate};
//   `

//   return new Promise((resolve, reject) => {
//     db.query(totalQuery, (error, results, fields) => {
//       const total = results[0].total
//       db.query(paginateQuery, (error, results, fields) => {
//         if (error) reject(error)
//         resolve({ results, total })
//       })
//     })
//   })
// }


const getRestaurantByUserId = (userId) => {
  console.log('Inside models/restaurants/getRestaurantsByUserId')

  const query = `
    SELECT *
    FROM restaurants
    WHERE owner_id=${db.escape(userId)}
  `
  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      if (error) reject(error)
      else resolve(results)
    }) 
  })
}


module.exports = { 
  createRestaurant, 
  getAllRestaurants, 
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getItemsByRestaurantId,
  getRestaurantByUserId
}