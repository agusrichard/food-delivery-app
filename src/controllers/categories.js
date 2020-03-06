const categoriesModel = require('../models/categories')


const createCategory = async (req, res) => {
  const { name, list_of_items } = req.body

  try {
    await categoriesModel.createCategory(name, list_of_items)
    res.json({
      success: true,
      msg: 'Success to create category'
    })
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to create category'
    })
  }
}


const getAllCategories = async (req, res) => {
  console.log('Inside controllers/categories/getAllCategories')

  try {
    const categories = await categoriesModel.getAllCategories()

    if (categories) {
      res.json({
        success: true,
        msg: 'Success to get all categories',
        categories
      })
    } else {
      res.json({
        success: false,
        msg: 'No categories found'
      })
    }
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to get categories'
    })
  }
}


const getCategoryById = async (req, res) => {
  const { id } = req.params
  console.log('Inside controllers/categories/getCategoryById')

  try {
    const items = await categoriesModel.getCategoryById(id)
    
    if (items) {
      res.json({
        success: true,
        msg: 'Success to get items by category',
        items
      })
    } else {
      res.json({
        success: false,
        msg: 'No item with that category'
      })
    }
    res.json
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to access this category'
    })
  }
}


module.exports = { createCategory, getAllCategories, getCategoryById }