const router = require('express').Router()
const { multerHelper } = require('../utilities/multerHelper')
const { isUserAuthenticated } = require('../middlewares/authUserToken')
const ItemsController = require('../controllers/items')


router.post('/', [isUserAuthenticated, multerHelper('items').single('itemImage')], ItemsController.createItem)

router.get('/', ItemsController.getAllItems)

router.get('/:id/reviews', ItemsController.getReviewsByItem)

router.patch('/:id', [isUserAuthenticated, multerHelper('items').single('itemImage')], ItemsController.updateItem)

router.delete('/:id', isUserAuthenticated, ItemsController.deleteItem)

router.get('/:id', ItemsController.getItemById)


module.exports = router