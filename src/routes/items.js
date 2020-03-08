const router = require('express').Router()
const { multerHelper } = require('../utilities/multerHelper')
const { isUserAuthenticated, isAdminUser } = require('../middlewares/authUserToken')
const { createItem, getAllItems, getItemById,  updateItem, deleteItem } =  require('../controllers/items')


router.post('/', [isUserAuthenticated, multerHelper('items').single('itemImage')], createItem)

router.get('/', getAllItems)

router.get('/:id', getItemById)

router.patch('/:id', isUserAuthenticated, updateItem)

router.delete('/:id', isUserAuthenticated, deleteItem)


module.exports = router