const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
require('dotenv').config()

// Owned defined imports
const usersModel = require('../models/users')
const mailer = require('../utilities/mailer')
const ResponseTemplate = require('../utilities/jsonFormatting')


// Controller to register new user
const register = async (req, res) => {
  const { name, username, email, password } = req.body

  try {
    if (username && password && email && name) {
      const hashedPassword = bcrypt.hashSync(password)
      const token = md5(username)
      const verificationUrl = process.env.APP_URL + 'auth/verify?code=' + token
      const userData = { name, username, email, hashedPassword, token }

      const canCreate = await usersModel.createUser(userData)
      if (canCreate) {
        const mailUrl = await mailer(email, 'Account Verification', verificationUrl)
        const data = { name, username, email, mailUrl }
        ResponseTemplate.successResponse(res, `User with username ${req.body.username} is created. Please verify your account.`, data)
      } else {
        ResponseTemplate.failedResponse(res, 'Username is already used')
      }
    } else {
      ResponseTemplate.failedResponse(res, 'Please provide name, username, email, and password')
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const login = async (req, res) => {
  const { username, password } = req.body

  try {
    if (username && password) {
      const user = await usersModel.getUserByUsername(username)
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          if (user.is_verified === 1) {
            const payload = {
              userId: user.id,
              username: user.username,
              email: user.email,
              roleId: user.role_id
            }
            const token = jwt.sign(payload, process.env.APP_KEY, { expiresIn: '60m' })
            const data = { username, token }
            ResponseTemplate.successResponse(res, 'Login success', data)
          } else {
            ResponseTemplate.failedResponse(res, 'Please verify your account before login')
          }
        } else {
          ResponseTemplate.failedResponse(res, 'Wrong username or password')
        }
      } else {
        ResponseTemplate.failedResponse(res, 'Wrong username or password')
      }
    } else {
      ResponseTemplate.failedResponse(res, 'Please provide username and password')
    }
  } catch(error) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const verify = async (req, res) => {
  console.log('Inside controllers/auth/verify')
  const code = req.query.code
  const { username } = req.body
  console.log(code)

  try {
    if (username) {
      console.log(username)
      const user = await usersModel.getUserByUsername(username)
      console.log(user)
      if (user) {
        console.log(user.verification_code)
        if (user.verification_code == code) {
          console.log(user.verification_code == code)
          await usersModel.verifyUser(username)
          res.json({
            success: true,
            msg: 'Success to verify your account'
          })
        } else {
          res.json({
            success: false,
            msg: 'Failed to verify account'
          })
        }
      } else {
        res.json({
          success: false,
          msg: 'Failed to verify account'
        })
      }
    } else {
      res.json({
        success: 'Failed to verify account'
      })
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}

const forgotPassword = async (req, res) => {
  console.log('Inside controllers/auth/forgotPassword')
  const { username, email } = req.body
  const payload = { username }
  const token = jwt.sign(payload, process.env.APP_KEY, { expiresIn: '60m' })
  const verificationUrl = process.env.APP_URL + 'auth/forgot-password/success?code=' + token
  console.log(payload)
  console.log(token)
  console.log(verificationUrl)

  try {
    console.log('before')
    const mailUrl = await mailer(email, 'Forgot Password', verificationUrl)
    console.log('after')
    res.json({
      status: true,
      msg: 'A forgot password link has been sent to your email',
      url: mailUrl
    })
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to change password'
    })
  }
}

const changePassword = async (req, res) => {
  console.log('Inside controllers/auth/changePassword')
  const code = req.query.code
  const { newPassword, confirmPassword } = req.body
  console.log(newPassword, confirmPassword)
  console.log(code)

  try {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const verification = jwt.verify(code, process.env.APP_KEY)
        const username = verification.username
        const hashedPassword = bcrypt.hashSync(newPassword)
        console.log(verification, username, hashedPassword)
        await usersModel.changePassword(username, hashedPassword)
        res.json({
          success: true,
          msg: 'Success to change password'
        })
      } else {
        res.json({
          success: false,
          msg: 'New password and confirm password must match'
        })
      }
    } else {
      res.json({
        success: false,
        msg: 'Please provide new password and confirm password'
      })
    }
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to change password'
    })
  }
}

module.exports = { 
  register, 
  login, 
  verify,
  forgotPassword,
  changePassword
}