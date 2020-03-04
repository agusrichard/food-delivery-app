const router = require('express').Router()

const { isUserAuthenticated, isAdminUser } = require('../middlewares/authUserToken')

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'You get all foods'
  })
})


router.get('/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({
    success: true,
    msg: `You get one food with id ${id}`
  })
})


router.post('/', [isUserAuthenticated, isAdminUser], (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'You post food',
    auth: req.auth
  })
})


router.delete('/:id', [isUserAuthenticated, isAdminUser], (req, res) => {
  const { id } = req.params
  res.status(200).json({
    success: true,
    msg: `You delete food with id ${id}`
  })
})


router.patch('/:id', [isUserAuthenticated, isAdminUser], (req, res) => {
  const { id } = req.params
  res.status(200).json({
    success: true,
    msg: `You patch food with id ${id}`
  })
})


module.exports = router