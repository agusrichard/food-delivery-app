const jwt = require('jsonwebtoken')

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
  console.log('something')
}

module.exports = { isUserAuthenticated, isAdminUser }