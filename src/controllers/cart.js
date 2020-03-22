const cartModel = require('../models/cart')
const usersModel = require('../models/users')
const ResponseTemplate = require('../utilities/jsonFormatting')


const getItemsInCart = async (req, res) => {
  const { userId } = req.auth
  console.log('Inside controllers/cart/getItemsInCart')
  try {
    const { results, total } = await cartModel.getItemsInCart(userId)
    const expenses = results.map(item => item.price).reduce((prev, curr) => prev + curr)

    if (results) {
      res.json({
        success: true,
        total_items: total,
        expenses,
        items: results
      })
    } else {
      res.json({
        success: false,
        msg: 'You don\'t have any item in your cart'
      })
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
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
    console.log(err)
    ResponseTemplate.internalErrorResponse(res)
  }
}


const checkout = async (req, res) => {
  const { userId, username } = req.auth
  console.log('Inside controllers/cart/checkout')
  const { expenses, listOfItems } = req.body

  try {
    const user = await usersModel.getUserByUsername(username)
    if (user) {
      const transaction = await cartModel.setTransaction(userId, expenses)
      console.log(transaction)
      listOfItems.forEach(async item => await cartModel.setCart(userId, item.itemId, item.quantity, transaction.transactionId))
      const newBalance = user.balance - expenses
      usersModel.updateBalance(username, newBalance)
      ResponseTemplate.successResponse(res, 'Success to checkout', {})
    } else {
      ResponseTemplate.failedResponse(res, 'You can\'t buy the items')
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


module.exports = { getItemsInCart, addItemsToCart, checkout }