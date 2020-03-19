const jwt = require('jsonwebtoken')
const ResponseTemplate = require('../utilities/jsonFormatting')
require('dotenv').config()


const isUserAuthenticated = (req, res, next) => {
  let token = req.headers.authorization || ''
  
  if (token.startsWith('Bearer')) {
    token = token.slice(7, token.length)
  } else {
    ResponseTemplate.unauthorizedResponse(res)
  }

  try {
    req.auth = jwt.verify(token, process.env.APP_KEY)
    next()
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}

const isAdminUser = (req, res, next) => {
  let token = req.headers.authorization || ''
  
  if (token.startsWith('Bearer')) {
    token = token.slice(7, token.length)
  } else {
    ResponseTemplate.unauthorizedResponse(res)
  }

  try {
    req.auth = jwt.verify(token, process.env.APP_KEY)
    const { roleId } = req.auth
 
    if ( parseInt(roleId) === 1 ) {
      next()
    } else {
      ResponseTemplate.unauthorizedResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse
  }
}

module.exports = { isUserAuthenticated, isAdminUser }