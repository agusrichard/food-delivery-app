const cartModel = require('../models/cart')
const usersModel = require('../models/users')


const getItemsInCart = async (req, res) => {
  const { userId } = req.auth
  console.log('Inside controllers/cart/getItemsInCart')
  try {
    const { results, total } = await cartModel.getItemsInCart(userId)
    const expenses = results.map(item => item.price).reduce((prev, curr) => prev + curr)

    if (items) {
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
    res.json({
      success: false,
      msg: 'Failed to load items in cart',
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


const checkout = async (req, res) => {
  const { userId, username } = req.auth
  console.log('Inside controllers/cart/checkOut')

  try {
    const { results, total } = await cartModel.getItemsInCart(userId)
    const user = await usersModel.getUserByUsername(username)

    if (user && items) {
      const expenses = results.map(item => item.price).reduce((prev, curr) => prev + curr)

      if (user.balance >= expenses) {
        const newBalance = user.balance - expenses

        await usersModel.updateBalance(username, newBalance)
        await cartModel.deleteCart(userId)
        res.json({
          success: true,
          total_items: total,
          items: results,
          currentBalance: newBalance,
          expenses, 
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
    res.json({
      success: false,
      msg: 'Failed to check out the cart'
    })
  }
}


module.exports = { getItemsInCart, addItemsToCart, checkout }