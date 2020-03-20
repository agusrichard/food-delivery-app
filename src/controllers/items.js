const itemsModel = require('../models/items')
const restaurantsModel = require('../models/restaurants')
const categoriesModel = require('../models/categories')
const { paginate } = require('../utilities/pagination')
const ResponseTemplate = require('../utilities/jsonFormatting')


const createItem = async (req, res) => {
  const { userId, roleId } = req.auth
  const { restaurantId, name, price, description, category } = req.body
  const itemImage = req.file ? req.file.path.replace(/\\/g, '/') : ''

  try {
    if (restaurantId && name && price && description) {
      const restaurant = await restaurantsModel.getRestaurantById(restaurantId)
      if (restaurant) {
        let itemCategory = await categoriesModel.getCategoryByName(category)
        if (itemCategory) {
          if (parseInt(userId) === restaurant.owner_id || parseInt(roleId) === 1) {
            const data = {
              restaurantId, 
              name, 
              price, 
              description, 
              itemCategoryId: itemCategory.id,
              itemImage
            }
            await itemsModel.createItem(data)
            ResponseTemplate.successResponse(res, 'Success to create item', data)
          } else {
            ResponseTemplate.failedResponse(res, 'Can\'t create item')
          }
        } else {
          await categoriesModel.createCategory(category)
          itemCategory = await categoriesModel.getCategoryByName(category)
          await itemsModel.createItem(restaurantId, name, price, description, itemCategory.id)
          const data = { restaurantId, name, price, description, category, itemImage }
          ResponseTemplate.successResponse(res, 'Success to create item', data)
        }
      } else {
        ResponseTemplate.notFoundResponse(res)
      }
    } else {
      ResponseTemplate.failedResponse(res, 
        'Please provide restaurant id, name, price, description, category, and item image')
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const getAllItems = async (req, res) => {
  try {
    const { results, total } = await itemsModel.getAllItems(req)
    const pagination = paginate(req, 'items', total)

    ResponseTemplate.successResponse(res, 'Success to get all items', { results, pagination })
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}

const getAllItemsNoPaginate = async (req, res) => {
  try {
    const items = await itemsModel.getAllItemsNoPaginate()

    ResponseTemplate.successResponse(res, 'Success to get all items', items)
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const getItemById = async (req, res) => {
  try {
    const item = await itemsModel.getItemById(req.params.id)
    if (item) {
      ResponseTemplate.successResponse(res, 'Success to get item', { item })
    } else {
      ResponseTemplate.notFoundResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const updateItem = async (req, res) => {
  const itemId = req.params.id
  const { userId } = req.auth
  const { name, price, description } = req.body
  const itemImage = req.file ? req.file.path.replace(/\\/g, '/') : ''
  console.log('Inside controllers/items/updateItem')
  console.log(userId, itemId, name, price, description, itemImage)
  
  try {
    const item = await itemsModel.getItemById(itemId)
    if (item) {
      const restaurant = await restaurantsModel.getRestaurantById(item.restaurant_id)
      if (parseInt(userId) === restaurant.owner_id || parseInt(roleId) === 1) {
        const data = {
          name: name || item.name,
          price: price || item.price,
          description: description || item.description,
          itemImage: itemImage || item.images
        }
        await itemsModel.updateItem(itemId, data)
        ResponseTemplate.successResponse(res, `Success to update item with id ${itemId}`, data)
      } else {
        ResponseTemplate.unauthorizedResponse(res)
      }
    } else {
      ResponseTemplate.notFoundResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
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
        ResponseTemplate.successResponse(res, `Success to delete item with id ${itemId}`, { item })
      } else {
        ResponseTemplate.unauthorizedResponse(res)
      }
    } else {
      ResponseTemplate.notFoundResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}

const getReviewsByItem = async (req, res) => {
  const itemId = req.params.id

  try {
    const item = await itemsModel.getItemById(itemId)

    if (item) {
      const { results, total } = await itemsModel.getReviews(item.id, req)
      const pagination = paginate(req, `items/${itemId}/reviews`, total)
      ResponseTemplate.successResponse(res, 'Success to get reviews of this item', { results, pagination })
    } else {
      ResponseTemplate.notFoundResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


module.exports = { 
  createItem, 
  getAllItems, 
  getItemById, 
  updateItem, 
  deleteItem,
  getReviewsByItem,
  getAllItemsNoPaginate
}