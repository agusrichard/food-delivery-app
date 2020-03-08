const usersModel = require('../models/users')
const { paginate, paginationParams } = require('../utilities/pagination')


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

const userProfileById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await usersModel.getUserById(id)
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
  const { email, fullName } = req.body
  const profilePicture = req.file ? req.file.path.replace('\\', '/') : ''

  console.log('Inside controllers/users/changeProfile')
  console.log(fullName)

  try {
    const user = await usersModel.getUserByUsername(username)
    console.log(user)
    if (user) {
      const data = {
        email: email || user.email,
        fullName: fullName || user.full_name,
        profilePicture: profilePicture || user.profile_picture
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
  console.log(username)

  try {
    const user = await usersModel.getUserByUsername(username)
    console.log(user)
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
      await usersModel.updateBalance(username, newBalance)
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


const getAllUsers = async (req, res) => { 
  try {
    const { results, total } = await usersModel.getAllUsers(req)
    const pagination = paginate(req, 'users', total)

    res.send({
      success: true,
      data: results,
      pagination 
    })
  } catch(err) {
    res.send({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


module.exports = { 
  userProfile, 
  changeProfile, 
  deleteUser, 
  topUp,
  userProfileById,
  getAllUsers 
}