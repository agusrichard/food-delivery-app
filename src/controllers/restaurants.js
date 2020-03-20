require('dotenv').config()

// Owned defined imports
const RestaurantsModel = require('../models/restaurants')
const { paginate } = require('../utilities/pagination')
const ResponseTemplate = require('../utilities/jsonFormatting')


const createRestaurant = async (req, res) => {
  const { userId } = req.auth
  const { name, location, description } = req.body
  const logo = req.file ? req.file.path.replace(/\\/g, '/') : ''
  console.log(userId, name, location, description, logo)

  try {
    if (name && location && description && logo) {
      const data = { name, location, description, logo }
      await RestaurantsModel.createRestaurant(userId, data)
      ResponseTemplate.successResponse(res, 'Restaurant is created successfully', data)
    } else {
      ResponseTemplate.failedResponse(res, 'Please provide the required fields')
    }
  } catch(err) {
    console.log(err)
    ResponseTemplate.internalErrorResponse(res)
  }
}


const getAllRestaurants = async (req, res) => { 
  try {
    const { results, total } = await RestaurantsModel.getAllRestaurants(req)
    const pagination = paginate(req, 'restaurants', total)
    ResponseTemplate.successResponse(res, 'Success to get all restaurants', { results, pagination })
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}

const getAllRestaurantsNoPaginate = async (req, res) => {
  try {
    const results = await RestaurantsModel.getAllRestaurantsNoPaginate()
    ResponseTemplate.successResponse(res, 'Success to get all restaurants', results)
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
  console.log('getItemsByRestaurant')
  const { restaurantId } = req.params
  console.log(restaurantId)

  try {
    const { results, total } = await RestaurantsModel.getItemsByRestaurantId(parseInt(restaurantId), req)
    const pagination = paginate(req, `restaurants/${restaurantId}/items`, total)
    if (results) {
      ResponseTemplate.successResponse(res, 'Success to get items in this restaurant', { results, pagination })
    } else {
      ResponseTemplate.notFoundResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const getRestaurantByUser = async (req, res) => {
  const { userId } = req.auth

  try {
    const restaurants = await RestaurantsModel.getRestaurantByUserId(userId)
    if (restaurants) {
      ResponseTemplate.successResponse(res, 'Success to get all restaurants owned by user', { restaurants })
    } else {
      ResponseTemplate.notFoundResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


module.exports = { 
  createRestaurant, 
  getAllRestaurants, 
  getRestaurantById, 
  updateRestaurant,
  deleteRestaurant,
  getItemsByRestaurant,
  getRestaurantByUser,
  getAllRestaurantsNoPaginate
}