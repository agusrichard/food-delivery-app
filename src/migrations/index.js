const db = require('../config/db')

function  migrate() {
  db.query(
    `
      CREATE DATABASE IF NOT EXISTS lecker_food_delivery_app;
      USE lecker_food_delivery_app;
    `
  , (error, results, fields) => {
    if (error) console.log(error)
    else console.log('Success to create database')
  })

  require('./zero/users')
  require('./zero/restaurants')
  require('./zero/items')
  require('./zero/userRoles')
  require('./zero/alterUsers')
  require('./zero/alterRestaurants')
  require('./zero/alterItems')
  require('./zero/transactions')
  require('./zero/itemCategories')
  require('./zero/itemCarts')
  require('./zero/itemReviews')

  return null
}




migrate()