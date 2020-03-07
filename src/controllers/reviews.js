const reviewsModel = require('../models/reviews')


const createReview = async (req, res) => {
  const { userId, roleId } = req.auth
  const { itemId, rating, review } = req.body
  console.log('Inside controllers/reviews/createReview')
  console.log(userId, roleId, itemId, rating, review)

  if (itemId && rating && review) {
    try {
      const data = { rating, review }

      await reviewsModel.createReview(userId, itemId, data)
      res.json({
        success: true,
        msg: 'Success to create review',
        data: data
      })
    } catch(err) {
      res.json({
        success: false,
        msg: 'Failed to create review'
      })
    }
  } else {
    res.json({
      success: false,
      msg: 'Please provide the required fields'
    })
  }
}


const getAllReviews = async (req, res) => {
  // Parameters to specify how to fetch all reviews
  const params = {
    currentPage: parseInt(req.query.page) || 1,
    perPage: parseInt(req.query.limit) || 5,
    search: req.query.search || '',
    sort: req.query.sort || { key: 'id', value: 0 }
  }

  // Create search parameters
  const searchKeys = Object.keys(params.search)
  if (req.query.search) {
    params.search = searchKeys.map((v, i) => {
      return { key: searchKeys[i], value: req.query.search[searchKeys[i]] }
    })
  }

  // Create sort parameters
  const sortKey = Object.keys(params.sort)
  if (req.query.sort) {
    params.sort = sortKey.map((v, i) => {
      return { key: sortKey[i], value: req.query.sort[sortKey[i]] }
    })[0]
  }

  try {
    const { results, total } = await reviewsModel.getAllReviews(params)
    const totalPages = Math.ceil(total / parseInt(params.perPage))

    // Initialize next page and previous page
    let nextPage = ''
    let previousPage = ''

    // Logic test for next page
    if (params.currentPage < totalPages) {
      const query = req.query
      query.page = params.currentPage + 1;
      nextPage = process.env.APP_URL.concat(`reviews?${qs.stringify(query)}`)
    } else {
      nextPage = null
    }

    // Logic test for previous page
    if (params.currentPage > 1) {
      const query = req.query
      query.page = params.currentPage - 1;
      previousPage = process.env.APP_URL.concat(`reviews?${qs.stringify(query)}`)
    } else {
      previousPage = null
    }

    const pagination = {
      ...params,
      nextPage,
      previousPage,
      totalPages,
      totalEntries: total
    }

    res.json({
      success: true,
      data: results,
      pagination
    })
  } catch(err) {
    res.json({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


const getReviewById = async (req, res) => {
  try {
    const review = await reviewsModel.getReviewById(req.params.id)
    if (review) {
      res.json({
        success: true,
        data: review
      })
    } else {
      res.json({
        success: false,
        msg: `Review with id:${req.params.id} is not found`
      })
    }
  } catch(err) {
    res.send({
      success: false,
      msg: 'There is an error occured ' + err
    })
  }
}


const updateReview = async (req, res) => {
  const reviewId = req.params.id
  const { userId, roleId } = req.auth
  const { rating, review } = req.body
  console.log('Inside controllers/reviews/updateReview')
  console.log(userId, reviewId, rating, review)
  
  try {
    const reviewFound = await reviewsModel.getReviewById(reviewId)
    console.log('reviewFound')
    console.log(reviewFound)
    if (reviewFound) {
      if (reviewFound.user_id === userId || roleId === 1) {
        const data = {
          rating: rating || reviewFound.rating,
          review: review || reviewFound.review
        }
        await reviewsModel.updateReview(reviewId, data)
        console.log('Inside the last if statement')
        res.json({
          success: true,
          msg: `Update review with id:${reviewId} is success`
        })
      } else {
        res.json({
          success: false,
          msg: 'Not allowed'
        })
      }
    } else {
      res.json({
        success: false,
        msg: 'No review found'
      })
    }
  } catch(err) {
    console.log('Inside catch')
    res.json({
      success: false,
      msg: 'Failed to update review'
    })
  }
}


const deleteReview = async (req, res) => {
  const reviewId = req.params.id
  const { userId, roleId } = req.auth
  console.log('Inside controllers/reviews/deleteReview')
  console.log(reviewId, userId, roleId)

  try {
    const reviewFound = await reviewsModel.getReviewById(reviewId)

    if (reviewFound) {
      if (reviewFound.user_id === userId || roleId === 1) {
        await reviewsModel.deleteReview(reviewId)
        res.json({
          success: true,
          msg: `Delete item with id ${reviewId} is success`
        })
      } else {
        res.json({
          success: false,
          msg: 'Can\'t delete this review'
        })
      }
    } else {
      res.json({
        success: false,
        msg: 'No review found'
      })
    }
  } catch(err) {
    res.json({
      success: false,
      msg: 'Failed to delete review'
    })
  }
}



module.exports = { 
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
}