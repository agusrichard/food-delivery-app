const router = require('express').Router()
const { isUserAuthenticated } = require('../middlewares/authUserToken')
const { createReview, getAllReviews, getReviewById, updateReview, deleteReview } = require('../controllers/reviews')


router.post('/', isUserAuthenticated, createReview)

router.get('/', getAllReviews)

router.get('/:id', getReviewById)

router.patch('/:id', isUserAuthenticated, updateReview)

router.delete('/:id', isUserAuthenticated, deleteReview)


module.exports = router