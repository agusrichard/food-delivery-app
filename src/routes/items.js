const router = require('express').Router()

const { isUserAuthenticated, isAdminUser } = require('../middlewares/authUserToken')
const { createItem, getAllItems, getItemById,  updateItem, deleteItem } =  require('../controllers/items')


router.post('/', isUserAuthenticated, createItem)

router.get('/', getAllItems)

router.get('/:id', getItemById)

router.patch('/:id', isUserAuthenticated, updateItem)

router.delete('/:id', isUserAuthenticated, deleteItem)


module.exports = router