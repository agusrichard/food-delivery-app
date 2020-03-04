const router = require('express').Router()

const { isUserAuthenticated, isAdminUser } = require('../middlewares/authUserToken')


router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'You get all restaurants'
  })
})


router.get('/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({
    success: true,
    msg: `You get one restaurant with id ${id}`
  })
})

router.post('/', [isUserAuthenticated, isAdminUser], (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'You post restaurant'
  })
})

router.delete('/:id', [isUserAuthenticated, isAdminUser], (req, res) => {
  const { id } = req.params
  res.status(200).json({
    success: true,
    msg: `You delete restaurant with id ${id}`
  })
})

router.patch('/:id', [isUserAuthenticated, isAdminUser], (req, res) => {
  const { id } = req.params
  res.status(200).json({
    success: true,
    msg: `You patch restaurant with id ${id}`
  })
})


module.exports = router