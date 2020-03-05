const cartModel = require('../models/cart')


const getItemsInCart = async (req, res) => {
  const { userId } = req.auth
  console.log('Inside controllers/cart/getItemsInCart')
  try {
    const items = await cartModel.getItemsInCart(userId)
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to load items in cart'
    })
  }
}


const addItemsToCart = async (req, res) => {
  const { userId } = req.auth
  const listOfItems = req.body.list_of_items
  console.log('Inside controllers/cart/addItemsToCart')
  console.log(listOfItems)
  try {
    await cartModel.addItemsToCart(userId, listOfItems)
    res.json({
      success: true,
      msg: 'Success to add items to cart'
    })
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to add items to cart'
    })
  }
}


module.exports = { getItemsInCart, addItemsToCart }