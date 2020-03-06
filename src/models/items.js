const db = require('../config/db')


const createItem = (restaurantId, name, price, description) => {
  console.log('In models/items/createItem')
  const query = `
    INSERT INTO items(restaurant_id, name, price, description)
    VALUES(
      ${db.escape(restaurantId)}, 
      ${db.escape(name)}, 
      ${db.escape(price)}, 
      ${db.escape(description)}
    );
  `

  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
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

  const selectTotal = `
    SELECT COUNT(*) AS total
    from items
  `

  const selectItems = `
    SELECT *
    FROM items
    ${conditions};
  `

  return new Promise((resolve, reject) => {
    db.query(selectTotal, (error, results, fields) => {
      const total = results[0].total
      db.query(selectItems, (error, results, fields) => {
        if (error) reject(error)
        resolve({ results, total })
      })
    })
  })
}


const getItemById = (id) => {
  console.log('In models/items/getItemById')

  const query = `
    SELECT *
    FROM items
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
      }
    )
  })
}


const updateItem = (id, data) => {
  console.log('In models/restaurants/updateItem')

  const query = `
    UPDATE items
    SET 
      name=${db.escape(data.name)}, 
      price=${db.escape(data.price)}, 
      description=${db.escape(data.description)}
    WHERE id=${db.escape(id)};
  `
  
  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
        if (error) reject(error)
        else resolve()
      }
    )
  })
}


const deleteItem = (id) => {
  console.log('In models/restaurants/deleteItem')

  const query = `
    DELETE FROM items
    WHERE id=${db.escape(parseInt(id))};
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
        if (error) reject(error)
        resolve()
      }
    )
  })
}

module.exports = { 
  createItem, 
  getAllItems, 
  getItemById, 
  updateItem, 
  deleteItem 
}



