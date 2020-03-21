const db = require('../config/db')
const { paginationParams } = require('../utilities/pagination')


const createItem = (data) => {

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

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
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

const getAllItemsNoPaginate = () => {

  const query = `
    SELECT *
    FROM items
  `

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })

  
}


const getItemById = (id) => {

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
      description=${db.escape(data.description)},
      images=${db.escape(data.itemImage)}
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


getReviews = (itemId, req) => {
  const { paginate, params } = paginationParams(req)

  const totalQuery = `
    SELECT COUNT(*) AS total
    FROM item_reviews
    WHERE item_id=${db.escape(itemId)}
    ${params.search && `AND ${params.search.map(v => `${v.key} LIKE '%${v.value}%'`).join(' AND ')}`};
  `

  const paginateQuery = `
    SELECT *
    FROM item_reviews
    WHERE item_id=${db.escape(itemId)}
    ${params.search && `AND ${params.search.map(v => `${v.key} LIKE '%${v.value}%'`).join(' AND ')}`}
    ${paginate};
  `

  return new Promise((resolve, reject) => {
    db.query(totalQuery, (error, results, fields) => {
      const total = results[0] ? results[0].total : 0
      db.query(paginateQuery, (error, results, fields) => {
        if (error) reject(error)
        resolve({ results, total })
      })
    })
  })
}

module.exports = { 
  createItem, 
  getAllItems, 
  getItemById, 
  updateItem, 
  deleteItem,
  getReviews,
  getAllItemsNoPaginate
}



