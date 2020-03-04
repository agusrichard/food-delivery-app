const express = require('express')
require('dotenv').config()

const app = express() 


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Keep your spirit up!'
  })
})


// Routes
app.use('/migrations', require('./src/routes/migrations'))
app.use('/foods', require('./src/routes/foods'))


// Port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))