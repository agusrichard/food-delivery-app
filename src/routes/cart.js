const router = require('express').Router()
const { isUserAuthenticated } = require('../middlewares/authUserToken')
const { getItemsInCart, addItemsToCart } = require('../controllers/cart')

router.get('/', isUserAuthenticated, getItemsInCart)

router.post('/', isUserAuthenticated, addItemsToCart)

module.exports = router