const router = require('express').Router()
const { isUserAuthenticated, isAdminUser } = require('../middlewares/authUserToken')
const { userProfile, changeProfile, deleteUser, topUp, userProfileById, getAllUsers } = require('../controllers/users')
const { multerHelper } = require('../utilities/multerHelper')


router.get('/profile', isUserAuthenticated, userProfile)
router.patch('/change-profile', [isUserAuthenticated, multerHelper().single('profilePicture')], changeProfile)
router.delete('/profile', isUserAuthenticated, deleteUser)
router.patch('/topup', isUserAuthenticated, topUp)
router.get('/:id', userProfileById)
router.get('/', getAllUsers)


module.exports = router