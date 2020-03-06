const db = require('../config/db')


const getItemsInCart = (userId) => {
  console.log('Inside models/cart/getItemsInCart')
  console.log(userId)
  return new Promise((resolve, reject) => {
    db.query(
      `
        SELECT *
        FROM items
        WHERE items.id IN (
          SELECT item_carts.item_id
          FROM item_carts
          WHERE item_carts.user_id=${db.escape(userId)}
        );
      `,
      (error, results, fields) => {
        if (error) reject(error)
        const total = results.length
        resolve({ results, total })
      }
    )
  })   
}


const addItemsToCart = (userId, listOfItems) => {
  console.log('Inside models/cart/addItemsToCart')
  console.log(userId, listOfItems)

  const query = listOfItems.map(
    itemId => `INSERT INTO item_carts(user_id, item_id) VALUES (${db.escape(userId)}, ${db.escape(itemId)})`
  ).join('; ')
  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
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