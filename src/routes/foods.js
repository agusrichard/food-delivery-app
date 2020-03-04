const router = require('express').Router()

const { isUserAuthenticated } = require('../middlewares/authUserToken')

router.get('/', [isUserAuthenticated], (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Foods is here'
  })
})

module.exports = router