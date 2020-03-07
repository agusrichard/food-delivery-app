const qs = require('qs')
const restaurantsModel = require('../models/restaurants')
const usersModel = require('../models/users')
const { paginate, paginationParams } = require('../utilities/pagination')
require('dotenv').config()


const createRestaurant = async (req, res) => {
  const { userId } = req.auth
  const { name, location, description } = req.body
  const logo = req.file.path.replace('\\', '/')
  
  if (name && location && description && logo) {
    try {
      const data = { name, location, description, logo }
      await restaurantsModel.createRestaurant(userId, data)
  
      res.json({
        success: true,
        msg: 'Restaurant is created successfully'
      })
    } catch(err) {
      res.json({
        success: false,
        msg: 'Failed to create restaurant'
      })
    }
  } else {
    res.json({
      success: false,
      msg: 'Please provide the required fields'
    })
  }
}

const getAllRestaurants = async (req, res) => { 
  try {
    const params = paginationParams(req)
    const { results, total } = await restaurantsModel.getAllRestaurants(params)
    const pagination = paginate(req, 'restaurants', total, params)

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


const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantsModel.getRestaurantById(req.params.id)
    if (restaurant) {
      res.json({
        success: true,
        data: restaurant
      })
    } else {
      res.json({
        success: false,
        msg: `Restaurant with id ${req.params.id} is not found`
      })
    }
  } catch(err) {
    res.send({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


const updateRestaurant = async (req, res) => {
  const { id } = req.params
  const { userId, roleId } = req.auth
  const { name, location, description } = req.body

  console.log('Inside controllers/restaurants/updateRestaurant')
  console.log(id, userId)

  try {
    const date = new Date()
    const restaurant = await restaurantsModel.getRestaurantById(id)
    console.log(restaurant)

    if (restaurant) {
      if (userId === restaurant.owner_id || parseInt(roleId) === 1) {
        
        const data = {
          name: name || restaurant.name,
          location: location || restaurant.location,
          description: description || restaurant.description,
          date: date || restaurant.date_updated
        }

        await restaurantsModel.updateRestaurant(id, data)
        res.send({
          success: true,
          msg: `Update restaurant with id ${id} is success`
        })

      } else {
        res.json({
          success: false,
          msg: 'You don\'t have permission to update this restaurant'
        })
      }
    } else {
      res.json({
        success: false,
        msg: `No restaurant with id ${id} found`
      })
    }

  } catch(err) {
    res.json({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


const deleteRestaurant = async (req, res) => {
  const { id } = req.params
  const { userId, roleId } = req.auth

  console.log('Inside controllers/restaurants/deleteRestaurant')
  console.log(id, userId)

  try {
    const restaurant = await restaurantsModel.getRestaurantById(id)
    console.log(restaurant)

    if (restaurant) {
      if (userId === restaurant.owner_id || parseInt(roleId) === 1) {
        await restaurantsModel.deleteRestaurant(id)
        res.json({
          success: true,
          msg: `Restaurant with id:${id} is deleted`
        })
      } else {
        res.json({
          success: false,
          msg: 'You don\'t have permission to delete this restaurant'
        })
      }
    } else {
      res.json({
        success: false,
        msg: `No restaurant with id ${id} found`
      })
    }

  } catch(err) {
    res.json({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


module.exports = { 
  createRestaurant, 
  getAllRestaurants, 
  getRestaurantById, 
  updateRestaurant,
  deleteRestaurant
}