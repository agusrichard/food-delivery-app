const itemsModel = require('../models/items')
const restaurantsModel = require('../models/restaurants')
const categoriesModel = require('../models/categories')
const { paginate } = require('../utilities/pagination')


const createItem = async (req, res) => {
  const { userId, roleId } = req.auth
  const { restaurantId, name, price, description, category } = req.body
  const itemImage = req.file.path.replace(/\\/g, '/')
  console.log('Inside controllers/items/createItem')
  console.log(userId, restaurantId, name, price, description)
  console.log(itemImage)
  

  if (restaurantId && name && price && description) {
    try {
      const restaurant = await restaurantsModel.getRestaurantById(restaurantId)
      console.log(restaurant)
      if (restaurant) {
        let itemCategory = await categoriesModel.getCategoryByName(category)
        console.log(itemCategory)
        if (itemCategory) {
          if (parseInt(userId) === restaurant.owner_id || parseInt(roleId) === 1) {
            console.log(parseInt(userId) === restaurant.owner_id || parseInt(roleId) === 1)
            const data = {
              restaurantId, 
              name, 
              price, 
              description, 
              itemCategoryId: itemCategory.id,
              itemImage
            }
            await itemsModel.createItem(data)
            res.json({
              success: true,
              msg: 'Item is created successfully'
            })
          } else {
            res.json({
              success: false,
              msg: `Can't create item`
            })
          }
        } else {
          await categoriesModel.createCategory(category)
          itemCategory = await categoriesModel.getCategoryByName(category)
          await itemsModel.createItem(restaurantId, name, price, description, itemCategory.id)
          res.json({
            success: true,
            msg: 'Item is created successfully'
          })
        }
      } else {
        res.json({
          success: false,
          msg: `No restaurant with id:${restaurantId} found`
        })
      }
    } catch(err) {
      res.json({
        success: false,
        msg: 'Failed to create item'
      })
    }
  } else {
    res.json({
      success: false,
      msg: 'Please provide the required fields'
    })
  }
}


const getAllItems = async (req, res) => {
  try {
    const { results, total } = await itemsModel.getAllItems(req)
    const pagination = paginate(req, 'items', total)

    res.send({
      success: true,
      data: results,
      pagination 
    })
  } catch(err) {
    res.send({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


const getItemById = async (req, res) => {
  try {
    const item = await itemsModel.getItemById(req.params.id)
    if (item) {
      res.json({
        success: true,
        data: item
      })
    } else {
      res.json({
        success: false,
        msg: `Item with id ${req.params.id} is not found`
      })
    }
  } catch(err) {
    res.send({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


const updateItem = async (req, res) => {
  const itemId = req.params.id
  const { userId } = req.auth
  const { name, price, description } = req.body
  console.log('Inside controllers/items/updateItem')
  console.log(userId, itemId, name, price, description)
  
  try {
    const item = await itemsModel.getItemById(itemId)
    if (item) {
      const restaurant = await restaurantsModel.getRestaurantById(item.restaurant_id)
      if (parseInt(userId) === restaurant.owner_id || parseInt(roleId) === 1) {
        const data = {
          name: name || item.name,
          price: price || item.price,
          description: description || item.description
        }
        await itemsModel.updateItem(itemId, data)
        res.send({
          success: true,
          msg: `Update item with id ${itemId} is success`
        })
      } else {
        res.json({
          success: false,
          msg: 'Can\'t update this item'
        })
      }
    } else {
      res.json({
        success: false,
        msg: 'No item found'
      })
    }
    
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to update item'
    })
  }
}


const deleteItem = async (req, res) => {
  const itemId = req.params.id
  const { userId } = req.auth
  console.log('Inside controllers/items/deleteItem')
  console.log(itemId, userId)

  try {
    const item = await itemsModel.getItemById(itemId)

    if (item) {
      const restaurant = await restaurantsModel.getRestaurantById(item.restaurant_id)
      if (restaurant.owner_id === userId) {
        await itemsModel.deleteItem(itemId)
        res.json({
          success: true,
          msg: `Delete item with id ${itemId} is success`
        })
      } else {
        res.json({
          success: false,
          msg: 'Can\'t update this item'
        })
      }
    } else {
      res.json({
        success: false,
        msg: 'No item found'
      })
    }
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to delete item'
    })
  }
}


module.exports = { 
  createItem, 
  getAllItems, 
  getItemById, 
  updateItem, 
  deleteItem 
}