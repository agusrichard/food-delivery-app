const router = require('express').Router()
const { isUserAuthenticated } = require('../middlewares/authUserToken')
const { getItemsInCart, addItemsToCart, checkout } = require('../controllers/cart')

router.get('/', isUserAuthenticated, getItemsInCart)

router.post('/', isUserAuthenticated, addItemsToCart)

router.post('/checkout', isUserAuthenticated, checkout)

module.exports = router