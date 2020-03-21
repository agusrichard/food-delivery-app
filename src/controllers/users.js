const usersModel = require('../models/users')
const ResponseTemplate = require('../utilities/jsonFormatting')
const { paginate, paginationParams } = require('../utilities/pagination')


const userProfile = async (req, res) => {
  console.log('userProfile')
  const { username } = req.auth

  try {
    const user = await usersModel.getUserByUsername(username)
    if (user) {
      ResponseTemplate.successResponse(res, 'Success to get user profile', { user })
    } else {
      ResponseTemplate.unauthorizedResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}

const userProfileById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await usersModel.getUserById(id)
    if (user) {
      ResponseTemplate.successResponse(res, 'Success to get user profile', { user })
    } else {
      ResponseTemplate.unauthorizedResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const changeProfile = async (req, res) => {
  const { username } = req.auth
  const { email, fullName, address } = req.body
  const profilePicture = req.file ? req.file.path.replace(/\\/g, '/') : ''

  try {
    const user = await usersModel.getUserByUsername(username)
    if (user) {
      const data = {
        email: email || user.email,
        fullName: fullName || user.full_name,
        profilePicture: profilePicture || user.profile_picture,
        address: address || user.address
      }
      await usersModel.changeProfile(user.id, data)
      ResponseTemplate.successResponse(res, 'Success to update user profile', data)
    } else {
      ResponseTemplate.unauthorizedResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const deleteUser = async (req, res) => {
  const { username } = req.auth

  try {
    const user = await usersModel.getUserByUsername(username)
    if (user) {
      await usersModel.deleteUser(user.id)
      ResponseTemplate.successResponse(res, 'Success to delete user account', {})
    } else {
      ResponseTemplate.unauthorizedResponse(res)
    }
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
  }
}


const topUp = async (req, res) => {
  const { username } = req.auth
  const { amount } = req.body

  try {
    const user = await usersModel.getUserByUsername(username)
    if (user) {
      let userBalance = user.balance == null ? 0 : user.balance
      let newBalance = parseInt(userBalance) + parseInt(amount)
      await usersModel.updateBalance(username, newBalance)
      ResponseTemplate.successResponse(res, 'Success to topup', { amount, newBalance })
    } else {
      ResponseTemplate.unauthorizedResponse(res)
    }
  } catch(err) {
    console.log(err)
    ResponseTemplate.internalErrorResponse(res)
  }
}


const getAllUsers = async (req, res) => { 
  try {
    const { results, total } = await usersModel.getAllUsers(req)
    const pagination = paginate(req, 'users', total)
    ResponseTemplate.successResponse(res, 'Success to get all users', { results, pagination })
  } catch(err) {
    ResponseTemplate.internalErrorResponse(res)
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