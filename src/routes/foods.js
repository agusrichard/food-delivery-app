const router = require('express').Router()

const { isUserAuthenticated, isAdminUser } = require('../middlewares/authUserToken')

router.get('/', [isUserAuthenticated, isAdminUser], (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'You will get the food'
  })
})


router.get('/:id', [isUserAuthenticated, isAdminUser], (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'You will get the food'
  })
})



module.exports = router