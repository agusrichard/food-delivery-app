const router = require('express').Router()

const { multerHelper } = require('../utilities/multerHelper')
const { isUserAuthenticated } = require('../middlewares/authUserToken')
const { 
    createRestaurant, 
    getRestaurantById, 
    getAllRestaurants, 
    updateRestaurant, 
    deleteRestaurant, 
    getItemsByRestaurant,
    getRestaurantByUser 
} = require('../controllers/restaurants')



router.get('/', getAllRestaurants)

router.post('/', [isUserAuthenticated, multerHelper('restaurants').single('logo')], createRestaurant)

router.delete('/:id', isUserAuthenticated, deleteRestaurant)

router.patch('/:id', isUserAuthenticated, updateRestaurant)

router.get('/:restaurantId/items', getItemsByRestaurant)

router.get('/owned', isUserAuthenticated, getRestaurantByUser)

router.get('/:id', getRestaurantById)


module.exports = router