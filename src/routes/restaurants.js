const router = require('express').Router()

const { multerHelper } = require('../utilities/multerHelper')
const { isUserAuthenticated } = require('../middlewares/authUserToken')
const { createRestaurant, getRestaurantById, getAllRestaurants, updateRestaurant, deleteRestaurant } = require('../controllers/restaurants')


router.get('/', getAllRestaurants)

router.get('/:id', getRestaurantById)

router.post('/', [isUserAuthenticated, multerHelper().single('logo')], createRestaurant)

router.delete('/:id', isUserAuthenticated, deleteRestaurant)

router.patch('/:id', isUserAuthenticated, updateRestaurant)


module.exports = router