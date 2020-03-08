const db = require('../config/db')
const { paginationParams } = require('../utilities/pagination')


const createItem = (data) => {
  console.log('In models/items/createItem')
  
  const query = `
    INSERT INTO items(restaurant_id, name, price, description, category_id, images)
    VALUES(
      ${db.escape(data.restaurantId)}, 
      ${db.escape(data.name)}, 
      ${db.escape(data.price)}, 
      ${db.escape(data.description)},
      ${db.escape(data.itemCategoryId)},
      ${db.escape(data.itemImage)}
    );
  `

  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      else resolve()
    })
  })
}


const getAllItems = (req) => {
  const { conditions, paginate } = paginationParams(req)

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) AS total
      from items
      ${conditions}`,
      (error, results, fields) => {
        const total = results[0].total
        db.query(
          `SELECT *
           FROM items
           ${conditions}
           ${paginate};`,
           (error, results, fields) => {
             if (error) reject(error)
             resolve({ results, total })
           }
        )
      }
    )
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



