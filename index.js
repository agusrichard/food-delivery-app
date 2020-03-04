const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

// Import middlewares
// const { isAdminUser } = require('./src/middlewares/authUserToken')


// Init App
const app = express() 


// Middleware
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
app.use('/migrations', require('./src/routes/migrations'))
// app.use('/auth', require('./src/routes/auth'))
// app.use('/foods', require('./src/routes/foods'))
// app.use('/restaurants', require('./src/routes/restaurants'))


// Port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))