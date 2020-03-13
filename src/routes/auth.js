const router = require('express').Router()
const { register, login, verify, forgotPassword, changePassword } = require('../controllers/auth')


router.post('/register', register)
router.post('/login', login)
router.get('/verify', verify)
router.post('/forgot-password', forgotPassword)
router.post('/forgot-password/success', changePassword)


module.exports = router