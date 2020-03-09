const router = require('express').Router()

const { multerHelper } = require('../utilities/multerHelper')
const { isUserAuthenticated } = require('../middlewares/authUserToken')
const RestaurantsController = require('../controllers/restaurants')



router.get('/', RestaurantsController.getAllRestaurants)

router.post('/', [isUserAuthenticated, multerHelper('restaurants').single('logo')], RestaurantsController.createRestaurant)

router.delete('/:id', isUserAuthenticated, RestaurantsController.deleteRestaurant)

router.patch('/:id', [isUserAuthenticated, multerHelper('restaurants').single('logo')], RestaurantsController.updateRestaurant)

router.get('/:restaurantId/items', RestaurantsController.getItemsByRestaurant)

router.get('/owned', isUserAuthenticated, RestaurantsController.getRestaurantByUser)

router.get('/:id', RestaurantsController.getRestaurantById)


module.exports = router