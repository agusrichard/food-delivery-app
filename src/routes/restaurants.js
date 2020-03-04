const router = require('express').Router()

const { isUserAuthenticated, isAdminUser } = require('../middlewares/authUserToken')
const { createRestaurant, getRestaurantById, getAllRestaurants, updateRestaurant, deleteRestaurant } = require('../controllers/restaurants')


router.get('/', getAllRestaurants)

router.get('/:id', getRestaurantById)

router.post('/', [isUserAuthenticated], createRestaurant)

router.delete('/:id', [isUserAuthenticated], deleteRestaurant)

router.patch('/:id', [isUserAuthenticated], updateRestaurant)


module.exports = router