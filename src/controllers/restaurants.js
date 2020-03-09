require('dotenv').config()

// Owned defined imports
const RestaurantsModel = require('../models/restaurants')
const { paginate } = require('../utilities/pagination')
const ResponseTemplate = require('../utilities/jsonFormatting')


const createRestaurant = async (req, res) => {
  const { userId } = req.auth
  const { name, location, description } = req.body
  const logo = req.file ? req.file.path.replace(/\\/g, '/') : ''

  try {
    if (name && location && description && logo) {
      const data = { name, location, description, logo }
      await RestaurantsModel.createRestaurant(userId, data)
      ResponseTemplate.successResponse(res, 'Restaurant is created successfully', data)
    } else {
      ResponseTemplate.failedResponse(res, 'Please provide the required fields')
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}

const getAllRestaurants = async (req, res) => { 
  try {
    const { results, total } = await RestaurantsModel.getAllRestaurants(req)
    const pagination = paginate(req, 'items', total)
    ResponseTemplate.successResponse(res, 'Success to get all restaurants', { results, pagination })
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await RestaurantsModel.getRestaurantById(req.params.id)
    if (restaurant) {
      ResponseTemplate.successResponse(res, `Success to get restaurant with id:${req.params.id}`, restaurant)
    } else {
      ResponseTemplate.notFoundResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const updateRestaurant = async (req, res) => {
  const { id } = req.params
  const { userId, roleId } = req.auth
  const { name, location, description } = req.body
  const logo = req.file ? req.file.path.replace(/\\/g, '/') : ''

  try {
    const restaurant = await RestaurantsModel.getRestaurantById(id)
    if (restaurant) {
      if (userId === restaurant.owner_id || parseInt(roleId) === 1) {
        const data = {
          name: name || restaurant.name,
          location: location || restaurant.location,
          description: description || restaurant.description,
          logo: logo || restaurant.logo
        }
        await RestaurantsModel.updateRestaurant(id, data)
        ResponseTemplate.successResponse(res, `Update restaurant with id ${id} is success`, {})
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


const deleteRestaurant = async (req, res) => {
  const { id } = req.params
  const { userId, roleId } = req.auth

  try {
    const restaurant = await RestaurantsModel.getRestaurantById(id)

    if (restaurant) {
      if (userId === restaurant.owner_id || parseInt(roleId) === 1) {
        await RestaurantsModel.deleteRestaurant(id)
        ResponseTemplate.successResponse(res, `Restaurant with id:${id} is deleted`, {})
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


const getItemsByRestaurant = async (req, res) => {
  const { restaurantId } = req.params
  console.log('Inside controllers/restaurants/getItemsByRestaurant')
  console.log(restaurantId)

  try {
    const items = await RestaurantsModel.getItemsByRestaurantId(parseInt(restaurantId), req)
    console.log(items)
    if (items) {
      ResponseTemplate.successResponse(res, `Success to get items from restaurant id ${restaurantId}`, items)
    } else {
      ResponseTemplate.notFoundResponse(res)
    }
  } catch(err) {
    console.log(err)
    ResponseTemplate.internalErrorResponse(res)
  }
}


const getRestaurantByUser = async (req, res) => {
  const { userId } = req.auth

  if (userId) {
    try {
      const restaurants = await RestaurantsModel.getRestaurantByUserId(userId)
      console.log(restaurants)
      res.json({
        success: true,
        data: restaurants
      })
    } catch(err) {
      res.json({
        success: false,
        msg: 'Failed to get restaurant owned by user'
      })
    }
  } else {
    res.json({
      success: false,
      msg: 'Failed to get restaurants owned by user'
    })
  }
}


module.exports = { 
  createRestaurant, 
  getAllRestaurants, 
  getRestaurantById, 
  updateRestaurant,
  deleteRestaurant,
  getItemsByRestaurant,
  getRestaurantByUser
}