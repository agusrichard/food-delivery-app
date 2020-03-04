const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Foods is here'
  })
})

module.exports = router