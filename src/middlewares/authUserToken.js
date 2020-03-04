const jwt = require('jsonwebtoken')
require('dotenv').config()


const isUserAuthenticated = (req, res, next) => {
  let token = req.headers.authorization || ''
  
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