const router = require('express').Router()
const { addAdminUser, getUserByUsername } = require('../models/users')


//  ======================= Migration zero ===============================

router.get('/zero/users', (req, res) => {
  require('../migrations/zero/users')
  res.status(200).json({
    success: true,
    msg: 'users table is created successfully'
  })
})

router.get('/zero/user-roles', (req, res) => {
  require('../migrations/zero/userRoles')
  res.status(200).json({
    success: true,
    msg: 'user_roles table is created successfully'
  })
})

router.get('/zero/alter-users', (req, res) => {
  require('../migrations/zero/alterUsers')
  res.status(200).json({
    success: true,
    msg: 'Altering users table is success'
  })
})


router.get('/zero/restaurants', (req, res) => {
  require('../migrations/zero/restaurants')
  res.status(200).json({
    success: true,
    msg: 'restaurants table is created successfully'
  })
})


router.get('/zero/items', (req, res) => {
  require('../migrations/zero/items')
  res.status(200).json({
    success: true,
    msg: 'items table is created succesfully'
  })
})


router.get('/zero/alter-restaurants', (req, res) => {
  require('../migrations/zero/alterRestaurants')
  res.status(200).json({
    success: true,
    msg: 'Altering restaurants table is success'
  })
})


router.get('/zero/alter-items', (req, res) => {
  require('../migrations/zero/alterItems')
  res.status(200).json({
    success: true,
    msg: 'Altering items table is success'
  })
})


router.get('/zero/item-reviews', (req, res) => {
  require('../migrations/zero/itemReviews')
  res.status(200).json({
    success: true,
    msg: 'item_reviews table is created successfully'
  })
})


router.get('/zero/item-categories', (req, res) => {
  require('../migrations/zero/itemCategories')
  res.status(200).json({
    success: true,
    msg: 'item_categories table is created successfully'
  })
})


router.get('/zero/item-carts', (req, res) => {
  require('../migrations/zero/itemCarts')
  res.status(200).json({
    success: true,
    msg: 'item_carts table is created successfully'
  })
})


router.get('/one/add-admin-role', (req, res) => {
  require('../migrations/one/addAdminRole')
  res.status(200).json({
    success: true, 
    msg: 'add admin role'
  })
})


router.post('/add-admin-user', async (req, res) => {
  const { id, username } = req.body

  if (id, username) {
    try {
      const user = await getUserByUsername(username)

      if (user) {
        
        await addAdminUser(user.id, user.username)
        res.json({
          success: true,
          msg: `Success to add admin user with id:${id} and username:${username}`
        })

      } else {
        res.json({
          success: false,
          msg: `No username:${username} found`
        })
      }
    } catch(err) {
      res.json({
        success: false,
        msg: `Failed to add admin user with id:${id} and username:${username}`
      })
    }

  } else {
    res.json({
      success: false,
      msg: 'Please provide id and username'
    })
  }
})


router.get('/one/alter-items', (req, res) => {
  require('../migrations/one/alterItems')
  res.status(200).json({
    success: true,
    msg: 'Altering items table is success'
  })
})


module.exports = router