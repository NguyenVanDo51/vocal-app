const express = require('express')
var cors = require('cors')
const authRoutes = require('./modules/auth/authRoutes')
const collectionRoutes = require('./modules/collection/collectionRoutes')
const userRoutes = require('./modules/user/userRoutes')

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*', // Cho phép tất cả các miền
  })
)

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use('/api', authRoutes)
app.use('/api', collectionRoutes)
app.use('/api', cors(), userRoutes)

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
