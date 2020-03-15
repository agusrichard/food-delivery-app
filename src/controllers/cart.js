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

  try {
    const { results, total } = await cartModel.getItemsInCart(userId)
    const user = await usersModel.getUserByUsername(username)
    console.log(results)
    console.log(total)
    console.log(user)

    if (user && results) {
      const expenses = results.map(item => item.price).reduce((prev, curr) => prev + curr)

      if (user.balance >= expenses) {
        const newBalance = user.balance - expenses

        await usersModel.updateBalance(username, newBalance)
        await cartModel.deleteCart(userId)
        res.json({
          success: true,
          total_items: total,
          currentBalance: newBalance,
          expenses,
          items: results 
        })
      } else {
        res.json({
          success: false,
          msg: 'Your balance less than your expenses'
        })
      }
    } else {
      res.json({
        success: false,
        msg: 'Can\'t checkout the cart'
      })
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


module.exports = { getItemsInCart, addItemsToCart, checkout }