const db = require('../config/db')


const createItem = (restaurantId, name, price, description) => {
  console.log('In models/items/createItem')
  return new Promise((resolve, reject) => {
    db.query(
      `
        INSERT INTO items(restaurant_id, name, price, description)
        VALUES(
          ${db.escape(restaurantId)}, 
          ${db.escape(name)}, 
          ${db.escape(price)}, 
          ${db.escape(description)}
        );
      `,
      (error, results, fields) => {
        if (error) reject(error)
        else resolve()
      }
    )
  })
}


const getAllItems = (params) => {
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
      `SELECT *
      FROM items
      ${conditions};`,
      (error, results, fields) => {
        if (error) reject(error)
        const total = results.length
        resolve({ results, total })
      }
    )
  })
}

const getItemById = (id) => {
  console.log('In models/items/getItemById')
  return new Promise((resolve, reject) => {
    db.query(
      `
        SELECT *
        FROM items
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


const updateItem = (id, data) => {
  console.log('In models/restaurants/updateItem')
  return new Promise((resolve, reject) => {
    db.query(
      `
        UPDATE items
        SET 
          name=${db.escape(data.name)}, 
          price=${db.escape(data.price)}, 
          description=${db.escape(data.description)}
        WHERE id=${db.escape(id)};
      `,
      (error, results, fields) => {
        if (error) reject(error)
        else resolve()
      }
    )
  })
}


const deleteItem = (id) => {
  console.log('In models/restaurants/deleteItem')
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM items
       WHERE id=${db.escape(parseInt(id))};`,
       (error, results, fields) => {
         if (error) reject(error)
         resolve()
       }
    )
  })
}

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem }



