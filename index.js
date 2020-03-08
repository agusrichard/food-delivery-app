const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

// Import middlewares
const { isAdminUser } = require('./src/middlewares/authUserToken')


// Init App
const app = express() 


// Middleware
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Keep your spirit up!'
  })
})


// Routes
app.use('/migrations', isAdminUser, require('./src/routes/migrations'))
app.use('/auth', require('./src/routes/auth'))
app.use('/users', require('./src/routes/users'))
app.use('/restaurants', require('./src/routes/restaurants'))
app.use('/items', require('./src/routes/items'))
// app.use('/cart', require('./src/routes/cart'))
app.use('/categories', require('./src/routes/categories'))
app.use('/reviews', require('./src/routes/reviews'))


// Port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))