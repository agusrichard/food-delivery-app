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


const setTransaction = (userId, expenses) => {
  console.log('Inside models/cart/setTransaction')
  const insertQuery = `
    INSERT INTO transactions(user_id, expenses)
    VALUES(${db.escape(userId)}, ${db.escape(expenses)});
  `

  const selectQuery = `
    SELECT MAX(id) as transactionId
    FROM transactions
    WHERE user_id=${db.escape(userId)};
  `

  return new Promise((resolve, reject) => {
    db.query(insertQuery, (error, results, fields) => {
      console.log(error)
      if (error) reject(error)
      else {
        db.query(selectQuery, (error, results, fields) => {
          if (error) reject(error)
          else resolve(results[0])
        })
      }
    })
  })
}

const setCart = (userId, itemId, quantity, transactionId) => {
  console.log('Inside models/cart/setCart')
  console.log(transactionId)
  const query = `
    INSERT INTO item_carts(user_id, item_id, quantity, transaction_id, is_success)
    VALUES (
      ${db.escape(userId)}, 
      ${db.escape(itemId)}, 
      ${db.escape(quantity)},
      ${db.escape(transactionId)},
      1
    );
  `

  console.log(query)

  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      console.log(error)
      if (error) reject(error)
      else resolve()
    })
  })
}


module.exports = { getItemsInCart, addItemsToCart, deleteCart, setTransaction, setCart }