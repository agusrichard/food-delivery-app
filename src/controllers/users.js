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

  try {
    const user = await usersModel.getUserByUsername(username)
    if (user) {
      const data = {
        email: email || user.email,
        full_name: full_name || user.full_name,
        profile_picture: profile_picture || user.profile_picture
      }

      await usersModel.changeProfile(data)
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
      let userBalance = user.balance == null ? 0 : user.balance
      let newAmount = parseInt(userBalance) + parseInt(amount)
      await usersModel.topUp(username, newAmount)
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