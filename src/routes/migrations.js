const router = require('express').Router()


//  ======================= Migration zero ===============================

router.get('/zero/users', (req, res) => {
  require('../migrations/zero/users')
  res.status(200).json({
    success: true,
    msg: 'users table is created successfully'
  })
})


router.get('/zero/restaurants', (req, res) => {
  require('../migrations/zero/restaurants')
  res.status(200).json({
    success: true,
    msg: 'restaurants table is created successfully'
  })
})


router.get('/zero/foods', (req, res) => {
  require('../migrations/zero/foods')
  res.status(200).json({
    success: true,
    msg: 'foods table is created succesfully'
  })
})


router.get('/zero/alter-restaurants', (req, res) => {
  require('../migrations/zero/alterRestaurants')
  res.status(200).json({
    success: true,
    msg: 'Altering restaurants table is success'
  })
})


router.get('/zero/alter-foods', (req, res) => {
  require('../migrations/zero/alterFoods')
  res.status(200).json({
    success: true,
    msg: 'Altering foods table is success'
  })
})


router.get('/zero/food-reviews', (req, res) => {
  require('../migrations/zero/foodReviews')
  res.status(200).json({
    success: true,
    msg: 'food_reviews table is created successfully'
  })
})


router.get('/zero/food-categories', (req, res) => {
  require('../migrations/zero/foodCategories')
  res.status(200).json({
    success: true,
    msg: 'food_categories table is created successfully'
  })
})


router.get('/zero/food-carts', (req, res) => {
  require('../migrations/zero/foodCarts')
  res.status(200).json({
    success: true,
    msg: 'food_carts table is created successfully'
  })
})

module.exports = router