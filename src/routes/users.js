const router = require('express').Router()
const { isUserAuthenticated } = require('../middlewares/authUserToken')
const { userProfile, changeProfile, deleteUser, topUp } = require('../controllers/users')


router.get('/profile', isUserAuthenticated, userProfile)
router.patch('/change-profile', isUserAuthenticated, changeProfile)
router.delete('/profile', isUserAuthenticated, deleteUser)
router.patch('/topup', isUserAuthenticated, topUp)


module.exports = router