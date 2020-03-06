const itemsModel = require('../models/items')
const restaurantsModel = require('../models/restaurants')


const createItem = async (req, res) => {
  const { userId, roleId } = req.auth
  const { restaurantId, name, price, description } = req.body
  console.log('Inside controllers/items/createItem')
  console.log(userId, restaurantId, name, price, description)
  

  if (restaurantId && name && price && description) {
    try {
      const restaurant = await restaurantsModel.getRestaurantById(restaurantId)

      if (restaurant) {
        if (parseInt(userId) === restaurant.owner_id || parseInt(roleId) === 1) {
          await itemsModel.createItem(restaurantId, name, price, description)
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
    const { results, total } = await itemsModel.getAllItems(params)
    const totalPages = Math.ceil(total / parseInt(params.perPage))

    // Initialize next page and previous page
    let nextPage = ''
    let previousPage = ''

    // Logic test for next page
    if (params.currentPage < totalPages) {
      const query = req.query
      query.page = params.currentPage + 1;
      nextPage = process.env.APP_URL.concat(`items?${qs.stringify(query)}`)
    } else {
      nextPage = null
    }

    // Logic test for previous page
    if (params.currentPage > 1) {
      const query = req.query
      query.page = params.currentPage - 1;
      previousPage = process.env.APP_URL.concat(`items?${qs.stringify(query)}`)
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