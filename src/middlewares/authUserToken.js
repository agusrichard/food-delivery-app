const jwt = require('jsonwebtoken')
require('dotenv').config()


const isUserAuthenticated = (req, res, next) => {
  let token = req.headers.authorization || ''
  console.log(token)
  if (token.startsWith('Bearer')) {
    token = token.slice(7, token.length)
  } else {
    res.send({
      success: false,
      msg: 'Unauthorized'
    })
  }

  try {
    req.auth = jwt.verify(token, process.env.APP_KEY)
    console.log(req.auth)
    next()
  } catch(err) {
    res.send({
      success: false,
      msg: err.message
    })
  }
}

const isAdminUser = (req, res, next) => {
  let token = req.headers.authorization || ''
  console.log(token)
  if (token.startsWith('Bearer')) {
    token = token.slice(7, token.length)
  } else {
    res.send({
      success: false,
      msg: 'Unauthorized'
    })
  }

  try {
    req.auth = jwt.verify(token, process.env.APP_KEY)
    const { username, email } = req.auth
    console.log('In isAdminUser')
    console.log('username: ' + username)
    console.log('email: ' + email)
    console.log('process.env.ADMIN_USERNAME: ' + process.env.ADMIN_USERNAME)
    console.log('process.env.ADMIN_EMAIL: ' + process.env.ADMIN_EMAIL)
    if (username === process.env.ADMIN_USERNAME && email === process.env.ADMIN_EMAIL) {
      next()
    } else {
      res.json({
        success: false,
        msg: 'Only admin allowed to access'
      })
    }
  } catch(err) {
    res.send({
      success: false,
      msg: err.message
    })
  }
}

module.exports = { isUserAuthenticated, isAdminUser }