const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const usersModel = require('../models/users')


const register = async (req, res) => {
  const { name, username, email, password } = req.body
  
  if (username && password && email && name) {
    const hashedPassword = bcrypt.hashSync(password);

    try {
      const canCreate = await usersModel.createUser(name, username, email, hashedPassword)
      if (canCreate) {
        res.json({
          status: true,
          msg: `User with username ${req.body.username} is created`
        })
      } else {
        res.json({
          status: false,
          msg: 'Username is taken'
        })
      }
    } catch(err) {
      res.send({
        status: false,
        msg: 'There is an error when creating the user ' + err
      })
    }

  } else {
    res.json({
      success: false,
      msg: 'Please provide name, username, email, and password'
    })
  }
}


const login = async (req, res) => {
  const { username, password } = req.body

  console.log('Inside /contollers/auth/login')
  console.log(username)
  console.log(password)

  if (username && password) {
    try {
      // Get user with username
      const user = await usersModel.getUserByUsername(username)
      console.log('user' + user)

      if (user) {
        console.log('Inside user if statement')
        if (bcrypt.compareSync(password, user.password)) {
          const data = {
            userId: user.id,
            username: user.username,
            email: user.email,
            roleId: user.role_id
          }
          const token = jwt.sign(data, process.env.APP_KEY, { expiresIn: '60m' })
          res.json({
            success: true,
            msg: 'Login success',
            token
          })
        } else {
          res.json({
            success: false,
            msg: 'Wrong password'
          })
        }
      } else {
        res.json({
          success: false,
          msg: `There is no user with username ${username}`
        })
      }
    } catch(err) {
      res.json({
        success: false,
        msg: 'There is an error occured ' + err
      })
    }
  } else {
    res.json({
      success: false,
      msg: 'Please provide username and password'
    })
  }
}


module.exports = { register, login }