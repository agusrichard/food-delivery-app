const usersModel = require('../models/users')


const userProfile = async (req, res) => {
  const { username } = req.auth

  try {
    const user = await usersModel.getUserByUsername(username)
    if (user) {
      res.json({
        success: true,
        data: user
      })
    } else {
      res.json({
        success: false,
        msg: 'Not allowed'
      })
    }
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to load user\'s profile'
    })
  }
}


const changeProfile = async (req, res) => {
  const { username } = req.auth
  const { email, full_name, profile_picture } = req.body

  console.log('Inside controllers/users/changeProfile')
  console.log(email, full_name, profile_picture)

  try {
    const user = await usersModel.getUserByUsername(username)
    console.log(user)
    if (user) {
      const data = {
        email: email || user.email,
        full_name: full_name || user.full_name,
        profile_picture: profile_picture || user.profile_picture
      }
      
      console.log(data)
      await usersModel.changeProfile(user.id, data)
      res.json({
        success: true,
        msg: 'Update user\'s profile is success'
      })
    } else {
      res.json({
        success: false,
        msg: 'Not allowed'
      })
    }
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to change user\'s profile'
    })
  }
}


const deleteUser = async (req, res) => {
  const { username } = req.auth

  try {
    const user = usersModel.getUserByUsername(username)

    if (user) {
      await usersModel.deleteUser(user.id)
      res.json({
        success: true,
        msg: 'Success to delete user'
      })
    } else {
      res.json({
        success: false,
        msg: 'Not allowed'
      })
    }
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to delete user'
    })
  }
}

const topUp = async (req, res) => {
  const { username } = req.auth
  const { amount } = req.body

  try {
    const user = await usersModel.getUserByUsername(username)

    if (user) {
      console.log('Inside controllers/users/topUp')
      console.log(user.balance)
      console.log(user.balance == null)
      let userBalance = user.balance == null ? 0 : user.balance
      let newBalance = parseInt(userBalance) + parseInt(amount)
      await usersModel.topUp(username, newBalance)
      res.json({
        success: true,
        msg: 'Topup success'
      })
    } else {
      res.json({
        success: false,
        msg: 'Not allowed'
      })
    }
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to topup'
    })
  }
}


module.exports = { userProfile, changeProfile, deleteUser, topUp }