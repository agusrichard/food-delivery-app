const router = require('express').Router()
const { isAdminUser } = require('../middlewares/authUserToken')
const { createCategory, getAllCategories,getCategoryById } = require('../controllers/categories')


// router.post('/', isAdminUser, createCategory)

router.get('/', getAllCategories)

router.get('/:id', getCategoryById)

module.exports = router