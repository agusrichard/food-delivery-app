const router = require('express').Router()

router.get('/zero/users', (req, res) => {
  require('../migrations/zero/users')
  res.status(200).json({
    success: true,
    msg: 'users table created successfully'
  })
})

module.exports = router