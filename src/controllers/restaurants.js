const restaurantsModel = require('../models/restaurants')


const createRestaurant = async (req, res) => {
  const { userId } = req.auth
  const { name, location, description } = req.body
  console.log('Inside controllers/restaurants')
  console.log(userId, name, location, description)
  try {
    await restaurantsModel.createRestaurant(userId, name, location, description)

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
  console.log('getAllRestaurant')
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
  console.log('updateRestaurant')
}


const deleteRestaurant = async (req, res) => {
  console.log('deleteRestaurant')
}


module.exports = { 
  createRestaurant, 
  getAllRestaurants, 
  getRestaurantById, 
  updateRestaurant,
  deleteRestaurant
}