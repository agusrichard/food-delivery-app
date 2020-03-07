const router = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Can\'t store the file'), false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

const { isUserAuthenticated } = require('../middlewares/authUserToken')
const { createRestaurant, getRestaurantById, getAllRestaurants, updateRestaurant, deleteRestaurant } = require('../controllers/restaurants')


router.get('/', getAllRestaurants)

router.get('/:id', getRestaurantById)

router.post('/', [isUserAuthenticated, upload.single('logo')], createRestaurant)

router.delete('/:id', isUserAuthenticated, deleteRestaurant)

router.patch('/:id', isUserAuthenticated, updateRestaurant)


module.exports = router