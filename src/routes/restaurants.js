const router = require('express').Router()

const { isUserAuthenticated, isAdminUser } = require('../middlewares/authUserToken')
const { createRestaurant, getRestaurantById } = require('../controllers/restaurants')


router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'You get all restaurants'
  })
})


router.get('/:id', getRestaurantById)

router.post('/', [isUserAuthenticated], createRestaurant)

router.delete('/:id', [isUserAuthenticated, isAdminUser], (req, res) => {
  const { id } = req.params
  res.status(200).json({
    success: true,
    msg: `You delete restaurant with id ${id}`
  })
})

router.patch('/:id', [isUserAuthenticated, isAdminUser], (req, res) => {
  const { id } = req.params
  res.status(200).json({
    success: true,
    msg: `You patch restaurant with id ${id}`
  })
})


module.exports = router