const qs = require('qs')
const restaurantsModel = require('../models/restaurants')
const usersModel = require('../models/users')
require('dotenv').config()


const createRestaurant = async (req, res) => {
  const { userId } = req.auth
  const { name, location, description } = req.body
  console.log('Inside controllers/restaurants')
  console.log(userId, name, location, description)
  try {
    const date = new Date()
    await restaurantsModel.createRestaurant(userId, name, location, description, date)

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
}

const getAllRestaurants = async (req, res) => {
  // Parameters to specify how to fetch all restaurans
  const params = {
    currentPage: parseInt(req.query.page) || 1,
    perPage: parseInt(req.query.limit) || 5,
    search: req.query.search || '',
    sort: req.query.sort || { key: 'id', value: 0 }
  }

  // Create search parameters
  const searchKeys = Object.keys(params.search)
  if (req.query.search) {
    params.search = searchKeys.map((v, i) => {
      return { key: searchKeys[i], value: req.query.search[searchKeys[i]] }
    })
  }

  // Create sort parameters
  const sortKey = Object.keys(params.sort)
  if (req.query.sort) {
    params.sort = sortKey.map((v, i) => {
      return { key: sortKey[i], value: req.query.sort[sortKey[i]] }
    })[0]
  }

  try {
    const { results, total } = await restaurantsModel.getAllRestaurants(params)
    const totalPages = Math.ceil(total / parseInt(params.perPage))

    // Initialize next page and previous page
    let nextPage = ''
    let previousPage = ''

    // Logic test for next page
    if (params.currentPage < totalPages) {
      const query = req.query
      query.page = params.currentPage + 1;
      nextPage = process.env.APP_URL.concat(`restaurants?${qs.stringify(query)}`)
    } else {
      nextPage = null
    }

    // Logic test for previous page
    if (params.currentPage > 1) {
      const query = req.query
      query.page = params.currentPage - 1;
      previousPage = process.env.APP_URL.concat(`restaurants?${qs.stringify(query)}`)
    } else {
      previousPage = null
    }

    const pagination = {
      ...params,
      nextPage,
      previousPage,
      totalPages,
      totalEntries: total
    }

    res.json({
      success: true,
      data: results,
      pagination
    })
  } catch(err) {
    res.json({
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
  const { userId, username } = req.auth
  const { name, location, description } = req.body

  console.log('Inside controllers/restaurants/updateRestaurant')
  console.log(id, userId)

  try {
    const date = new Date()
    const restaurant = await restaurantsModel.getRestaurantById(id)
    console.log(restaurant)

    if (restaurant) {
      if (userId === restaurant.owner_id || username === process.env.ADMIN_USERNAME) {
        
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
  const { userId, username } = req.auth

  console.log('Inside controllers/restaurants/deleteRestaurant')
  console.log(id, userId)

  try {
    const restaurant = await restaurantsModel.getRestaurantById(id)
    console.log(restaurant)

    if (restaurant) {
      if (userId === restaurant.owner_id || username === process.env.ADMIN_USERNAME) {
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