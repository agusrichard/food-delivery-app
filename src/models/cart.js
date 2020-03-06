const db = require('../config/db')


const getItemsInCart = (userId) => {
  console.log('Inside models/cart/getItemsInCart')
  console.log(userId)

  const query = `
    SELECT *
    FROM items
    WHERE items.id IN (
      SELECT item_carts.item_id
      FROM item_carts
      WHERE item_carts.user_id=${db.escape(userId)}
    );
  `
  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      if (error) reject(error)
      const total = results.length
      resolve({ results, total })
      console.log('inside')
      console.log(results)
      console.log(results)
      }
    )
  })   
}


const addItemsToCart = (userId, listOfItems) => {
  console.log('Inside models/cart/addItemsToCart')
  console.log(userId, listOfItems)

  const query = listOfItems.map(
    itemId => `INSERT INTO item_carts(user_id, item_id) VALUES(${db.escape(parseInt(userId))}, ${db.escape(parseInt(itemId))})`
  ).join('; ').concat(';')
  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      if (error) reject(error)
      resolve()
    })
  })
}

const deleteCart = (userId) => {
  console.log('Inside models/cart/deleteCart')
  console.log(userId)

  const query = `
    DELETE FROM item_carts
    WHERE user_id=${db.escape(userId)}
  `
  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) reject(error)
      resolve()
    })
  })
}


module.exports = { getItemsInCart, addItemsToCart, deleteCart }