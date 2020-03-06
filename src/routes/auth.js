const router = require('express').Router()
const { register, login, updateUser, deleteUser } = require('../controllers/auth')
const { isUserAuthenticated } = require('../middlewares/authUserToken')


router.post('/register', register)
router.post('/login', login)


module.exports = router